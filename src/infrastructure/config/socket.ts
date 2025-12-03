import { Server } from 'socket.io';
import { addUser, getAllUsers, getUserDetails, removeUser } from '../services/socket.manager';
import { config } from './config';
import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/user.type';


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
        const pollId = socket.data.pollId;

        if (user.id) {
            addUser(user.id, socket.id, user.email);

            // Join the room for this poll
            socket.join(`poll_${pollId}`);

            socket.emit('online-users', Array.from(getAllUsers().keys()));

            // Notify others in the same poll
            socket.broadcast
                .to(`poll_${pollId}`)
                .emit('user_online', user.id);

            console.log(`User ${user.id} connected with socket ${socket.id}`);
        }

        socket.on('send-message', (data) => {
            // const username = users.get(socket.id);
            const message = {
                userId: socket.id,
                username: 'Anonymous',
                text: data.text,
                timestamp: new Date().toISOString()
            };

            // Broadcast message to all connected clients
            if (io) {
                io.emit('new-message', message);
                console.log('Message sent:', message);
            }
        });

        // Handle typing indicator
        socket.on('typing', (isTyping) => {
            const userDtls = getUserDetails(user.id);
            if (userDtls && isTyping) {
                socket.broadcast.emit('user-typing', { email: userDtls.userEmail, isTyping });
            }
        });

        socket.on('disconnect', () => {
            removeUser(socket.id);

            socket.broadcast
                .to(`poll_${pollId}`)
                .emit('user_offline', user.id);

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