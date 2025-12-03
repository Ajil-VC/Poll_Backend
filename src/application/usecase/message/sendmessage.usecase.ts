import { Message } from "../../../domain/entities/message.type";
import { IMessageRepository } from "../../../domain/repositories/message.repo";
import { MessageMapper } from "../../../presentation/DTO/DTOMAPPER/message.mapper";
import { ISendMessageUsecase } from "../../usecaseInterface/message.di";


export class SendMessageUsecase implements ISendMessageUsecase {

    constructor(private msgRepo: IMessageRepository) { }

    execute = async (userId: string, message: string, pollId: string, type: "text" | "system"): Promise<Message> => {

        const sentMessage = await this.msgRepo.sendMessage(userId, message, pollId, type);
        return MessageMapper.toResponseDTO(sentMessage);

    }

}