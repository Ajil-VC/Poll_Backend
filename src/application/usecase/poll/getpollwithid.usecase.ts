import { Poll } from "../../../domain/entities/poll.type";
import { IPollRepository } from "../../../domain/repositories/poll.repo";
import { PollMapper } from "../../../presentation/DTO/DTOMAPPER/poll.mapper";
import { IGetPollWithIDUsecase } from "../../usecaseInterface/poll.di";


export class GetPollWithIDUsecase implements IGetPollWithIDUsecase {

    constructor(private pollRepo: IPollRepository) { }

    execute = async (pollId: string): Promise<Poll> => {

        const poll = await this.pollRepo.getPollWithId(pollId);
        return PollMapper.toResponseDTO(poll);
    }
}