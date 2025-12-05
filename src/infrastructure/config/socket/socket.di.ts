import { SendMessageUsecase } from "../../../application/usecase/message/sendmessage.usecase";
import { GiveVoteUsecase } from "../../../application/usecase/poll/givevote.usecase";
import { ISendMessageUsecase } from "../../../application/usecaseInterface/message.di";
import { IGiveVoteUsecase } from "../../../application/usecaseInterface/poll.di";
import { IMessageRepository } from "../../../domain/repositories/message.repo";
import { IPollRepository } from "../../../domain/repositories/poll.repo";
import { MessageRepositoryImp } from "../../repositories/repos/messagerepo.implement";
import { PollRepositoryImp } from "../../repositories/repos/pollrepo.implement";



const msgRepo: IMessageRepository = new MessageRepositoryImp();
export const sendMsgUsecase: ISendMessageUsecase = new SendMessageUsecase(msgRepo);


const pollRepo : IPollRepository = new PollRepositoryImp();
export const giveVoteUsecase : IGiveVoteUsecase = new GiveVoteUsecase(pollRepo);



// giveVote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

//         try {

//             const { pollId, optionId } = req.body;
            
//             

//             const response: ResponseDTO<Poll> = {
//                 status: true,
//                 message: `Successfully voted`,
//                 data: poll
//             }

//             res.status(HttpStatusCode.OK).json(response);
//             return;

//         } catch (err) {
//             next(err);
//         }

//     }