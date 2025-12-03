import { MessageWithUser } from "../../infrastructure/database/model/message.interface";

export interface IMessageRepository {

    sendMessage(userId: string, message: string, pollId: string, type: "text" | "system"): Promise<MessageWithUser>;
}