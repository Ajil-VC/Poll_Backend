import { Server } from 'socket.io';
import { addUser, getAllUsers, getUserDetails, removeUser } from '../../services/socket.manager';
import { config } from '../config';
import jwt from 'jsonwebtoken';
import { User } from '../../../domain/entities/user.type';
import { giveVoteUsecase, sendMsgUsecase } from './socket.di';

let io: Server | null = null;

export const setupSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: config.FRONTEND_URL,
            credentials: true,
        }
    });

    //Sockets need to have seperate middleware.
    //For now Im creating socket middleware hereonly.

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        try {

            if (!token) {
                return next(new Error('Authentication error: Token missing'));
            }

            if (!config.JWT_SECRETKEY) {
                throw new Error('JWT secret key is not defined.');
            }

            const decoded = jwt.verify(token, config.JWT_SECRETKEY, (err: any, decoded: any) => {

                if (err) return next(new Error('Authentication error: Invalid token'));

                socket.data.user = decoded;
                next();
            });

        } catch (err) {
            return next(new Error('Authentication error: Invalid token'));
        }
    });

    io.on('connection', (socket) => {

        const user: User = socket.data.user;

        socket.on('join-poll', (pollId) => {
            addUser(user.id, socket.id, user.email);
            socket.data.pollId = pollId;
            socket.join(`poll_${pollId}`);
            
            socket.broadcast
                .to(`poll_${pollId}`)
                .emit('user_online', user.id);
            console.log(`User ${user.email} connected with socket ${socket.id} with poll ${pollId}`);
        });

        socket.on('send-message', async (data) => {

            try {
                const pollId = socket.data.pollId;
                const message = await sendMsgUsecase.execute(user.id, data.text, pollId);

                if (io) {
                    io.to(`poll_${pollId}`).emit('new-message', message);
                }

            } catch (err) {
                console.error(err);
            }
        });

        // Handle typing indicator
        socket.on('typing', (isTyping) => {
            const pollId = socket.data.pollId;
            const userDtls = getUserDetails(user.id);
            if (userDtls) {
                socket.broadcast
                    .to(`poll_${pollId}`)
                    .emit('user-typing', {
                        email: userDtls.userEmail,
                        isTyping
                    });
            }
        });

        socket.on('poll', async (data) => {

            try {
                const pollId = socket.data.pollId;
                const poll = await giveVoteUsecase.execute(pollId, data.optionId, user.id);

                if (io) {

                    io.to(`poll_${pollId}`).emit('new-poll', poll);
                }

            } catch (err) {
                console.error(err);
            }
        });

        socket.on('disconnect', () => {
            const pollId = socket.data.pollId;
            socket.broadcast
                .to(`poll_${pollId}`)
                .emit('user_offline', user.id);

            removeUser(socket.id);

            console.log('user disconnected', user.id);
        });
    });



    return io;
};


export const getIO = (): Server => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};