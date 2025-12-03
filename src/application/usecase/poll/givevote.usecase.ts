import { Poll } from "../../../domain/entities/poll.type";
import { IPollRepository } from "../../../domain/repositories/poll.repo";
import { PollMapper } from "../../../presentation/DTO/DTOMAPPER/poll.mapper";
import { IGiveVoteUsecase } from "../../usecaseInterface/poll.di";


export class GiveVoteUsecase implements IGiveVoteUsecase {

    constructor(private pollRepo: IPollRepository) { }

    execute = async (pollId: string, optionId: string, userId: string): Promise<Poll> => {

        const poll = await this.pollRepo.giveVote(pollId, optionId, userId);
        return PollMapper.toResponseDTO(poll);
    }
}