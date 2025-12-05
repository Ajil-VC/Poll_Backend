import { SigninUseCase } from "../../../application/usecase/auth/login.usecase";
import { SignUpUseCase } from "../../../application/usecase/auth/signup.usecase";
import { IGetUserByIdUsecase, ISigninUsecase, ISignUpUseCase } from "../../../application/usecaseInterface/auth.di";
import { AuthController } from "../../controller/auth.controller";
import { IUserRepository } from "../../../domain/repositories/user.repo";
import { ISecurePassword } from "../../../domain/services/securePassword.interface";
import { UserRepositoryImp } from "../../../infrastructure/repositories/repos/userrepo.implement";
import { SecurePasswordImp } from "../../../infrastructure/services/securepassword.service";
import { IAuthController } from "../../interface/auth.controller.interface";
import { IPollController } from "../../interface/poll.controller.interface";
import { PollController } from "../../controller/poll.controller";
import { PollRepositoryImp } from "../../../infrastructure/repositories/repos/pollrepo.implement";
import { ICreatepollUsecase, IGetPollsUsecase, IGetPollWithIDUsecase, IGiveVoteUsecase } from "../../../application/usecaseInterface/poll.di";
import { CreatePollUsecase } from "../../../application/usecase/poll/createpoll.usecase";
import { IPollRepository } from "../../../domain/repositories/poll.repo";
import { GetPollsUsecase } from "../../../application/usecase/poll/getpolls.usecase";
import { GetPollWithIDUsecase } from "../../../application/usecase/poll/getpollwithid.usecase";
import { GiveVoteUsecase } from "../../../application/usecase/poll/givevote.usecase";
import { GetUserByIdUsecase } from "../../../application/usecase/auth/getuserbyid.usecase";
import { IMessageController } from "../../interface/message.controller.interface";
import { MessageController } from "../../controller/message.controller";
import { IGetMessagesUsecase } from "../../../application/usecaseInterface/message.di";
import { GetMessagesUsecase } from "../../../application/usecase/message/getMessages.usecase";
import { IMessageRepository } from "../../../domain/repositories/message.repo";
import { MessageRepositoryImp } from "../../../infrastructure/repositories/repos/messagerepo.implement";

const userRepo: IUserRepository = new UserRepositoryImp();
const securePassword: ISecurePassword = new SecurePasswordImp();
const signInUsecase: ISigninUsecase = new SigninUseCase(userRepo, securePassword);
const signUpUsecase: ISignUpUseCase = new SignUpUseCase(securePassword, userRepo);
const getUserByIdUsecase: IGetUserByIdUsecase = new GetUserByIdUsecase(userRepo);
export const authControllerDepandancy: IAuthController = new AuthController(
    signInUsecase,
    signUpUsecase,
    getUserByIdUsecase
);

const pollRepo: IPollRepository = new PollRepositoryImp();
const createPoll: ICreatepollUsecase = new CreatePollUsecase(pollRepo);
const getPolls: IGetPollsUsecase = new GetPollsUsecase(pollRepo);
const getPollWithId: IGetPollWithIDUsecase = new GetPollWithIDUsecase(pollRepo);
const giveVote: IGiveVoteUsecase = new GiveVoteUsecase(pollRepo);
export const pollControllerDepandancy: IPollController = new PollController(createPoll, getPolls, getPollWithId);

const msgRepo: IMessageRepository = new MessageRepositoryImp();
const getMessages: IGetMessagesUsecase = new GetMessagesUsecase(msgRepo);
export const messageDepandancy: IMessageController = new MessageController(getMessages);