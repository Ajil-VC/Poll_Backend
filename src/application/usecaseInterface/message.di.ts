import { Message } from "../../domain/entities/message.type";

export interface ISendMessageUsecase {
    execute(userId: string, message: string, pollId: string, type: "text" | "system"): Promise<Message>;
}