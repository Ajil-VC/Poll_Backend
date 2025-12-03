import { SendMessageUsecase } from "../../../application/usecase/message/sendmessage.usecase";
import { ISendMessageUsecase } from "../../../application/usecaseInterface/message.di";
import { IMessageRepository } from "../../../domain/repositories/message.repo";
import { MessageRepositoryImp } from "../../repositories/repos/messagerepo.implement";



const msgRepo: IMessageRepository = new MessageRepositoryImp();
export const sendMsgUsecase: ISendMessageUsecase = new SendMessageUsecase(msgRepo);