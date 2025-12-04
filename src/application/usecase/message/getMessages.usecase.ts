import { Message } from "../../../domain/entities/message.type";
import { IMessageRepository } from "../../../domain/repositories/message.repo";
import { MessageMapper } from "../../../presentation/DTO/DTOMAPPER/message.mapper";
import { IGetMessagesUsecase } from "../../usecaseInterface/message.di";


export class GetMessagesUsecase implements IGetMessagesUsecase {

    constructor(private msgRepo: IMessageRepository) { }


    execute = async (pollId: string, skip: number, limit: number): Promise<Message[]> => {

        const messages = await this.msgRepo.getMessages(pollId, skip, limit);
        const msgs = messages.map(m => MessageMapper.toResponseDTO(m));

        return msgs.reverse();
    }
}