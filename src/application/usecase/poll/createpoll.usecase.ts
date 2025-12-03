
import { Poll } from "../../../domain/entities/poll.type";
import { config } from "../../../infrastructure/config/config";
import { PollRepositoryImp } from "../../../infrastructure/repositories/repos/pollrepo.implement";
import { PollMapper } from "../../../presentation/DTO/DTOMAPPER/poll.mapper";
import { ICreatepollUsecase } from "../../usecaseInterface/poll.di";


export class CreatePollUsecase implements ICreatepollUsecase {

    constructor(private _pollRepo: PollRepositoryImp) { }

    execute = async (question: string, options: Array<string>, userId: string): Promise<Poll> => {

        const frontendURL = config.FRONTEND_URL;
        if (!frontendURL) {
            throw new Error('URL Missing! Poll cannot be created at this moment.');
        }
        const result = await this._pollRepo.createPoll(question, options, frontendURL, userId);

        return PollMapper.toResponseDTO(result);
    }

}