import { Message } from "../../../domain/entities/message.type";
import { MessageWithUser } from "../../../infrastructure/database/model/message.interface";



export class MessageMapper {
    static toResponseDTO(msg: MessageWithUser): Message {
        return {
            id: msg._id.toString(),
            user: {
                id: msg.userId._id.toString(),
                email: msg.userId.email,
                isAdmin: msg.userId.isAdmin,
                userName: msg.userId.userName,
                createdAt: msg.userId.createdAt!,
                updatedAt: msg.userId.updatedAt!
            },
            message: msg.message.toString(),
            pollId: msg.pollId.toString(),
            type: msg.type,
            createdAt: msg.createdAt!,
            updatedAt: msg.updatedAt!
        };
    }
}