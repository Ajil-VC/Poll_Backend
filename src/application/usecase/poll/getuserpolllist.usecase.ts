import { ListPoll } from "../../../domain/entities/poll.type";
import { IPollRepository } from "../../../domain/repositories/poll.repo";
import { PollMapper } from "../../../presentation/DTO/DTOMAPPER/poll.mapper";
import { IGetUserPollsList } from "../../usecaseInterface/poll.di";



export class GetUserPollList implements IGetUserPollsList {

    constructor(private pollRepo: IPollRepository) { }

    execute = async (userId: string): Promise<ListPoll[]> => {

        const poll = await this.pollRepo.getUserPollList(userId);
        const mList = poll.map(p => PollMapper.toPollListDTO(p));
        return mList;
    }

}