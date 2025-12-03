import mongoose from "mongoose";
import { IMessageRepository } from "../../../domain/repositories/message.repo";
import { MessageWithUser } from "../../database/model/message.interface";
import messageModel from "../../database/message.model";


export class MessageRepositoryImp implements IMessageRepository {

    sendMessage = async (userId: string, message: string, pollId: string, type: "text" | "system"): Promise<MessageWithUser> => {

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