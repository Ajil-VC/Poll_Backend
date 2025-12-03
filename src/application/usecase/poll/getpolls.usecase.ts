import { Poll } from "../../../domain/entities/poll.type";
import { IPollRepository } from "../../../domain/repositories/poll.repo";
import { PollMapper } from "../../../presentation/DTO/DTOMAPPER/poll.mapper";
import { IGetPollsUsecase } from "../../usecaseInterface/poll.di";


export class GetPollsUsecase implements IGetPollsUsecase {

    constructor(private _pollRepo: IPollRepository) { }

    execute = async (userId: string): Promise<Poll[]> => {

        const polls = await this._pollRepo.getPolls(userId);
        const cleanPolls = polls.map((item) => PollMapper.toResponseDTO(item));
        return cleanPolls;
    }
}