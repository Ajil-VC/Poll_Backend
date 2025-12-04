import mongoose from "mongoose";
import { IMessageRepository } from "../../../domain/repositories/message.repo";
import { MessageWithUser } from "../../database/model/message.interface";
import messageModel from "../../database/message.model";


export class MessageRepositoryImp implements IMessageRepository {


    getMessages = async (pollId: string, skip: number, limit: number): Promise<MessageWithUser[]> => {

        const pollOb = new mongoose.Types.ObjectId(pollId);
        const messages = await messageModel
            .find({ pollId: pollOb })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit).populate({ path: 'userId' });

        return messages;
    }

    sendMessage = async (userId: string, message: string, pollId: string, type: "text" | "system" = 'text'): Promise<MessageWithUser> => {

        const userOb = new mongoose.Types.ObjectId(userId);
        const pollOb = new mongoose.Types.ObjectId(pollId);

        const newMessage = new messageModel({
            userId: userOb,
            pollId: pollOb,
            message,
            type,
        });

        const sentMessage = await (await newMessage.save()).populate('userId');
        if (!sentMessage) {
            throw new Error('Couldnt send the message due to internal error');
        }

        return sentMessage;
    }

}