import { ListPoll, Poll } from "../../domain/entities/poll.type";
import { PollDocument } from "../../infrastructure/database/model/poll.interface";


export interface ICreatepollUsecase {
    execute(question: string, options: Array<string>, userId: string): Promise<Poll>;
}

export interface IGetPollsUsecase {
    execute(userId: string): Promise<Poll[]>;
}

export interface IGetPollWithIDUsecase {
    execute(pollId: string): Promise<Poll>;
}

export interface IGiveVoteUsecase {
    execute(pollId: string, optionId: string, userId: string): Promise<Poll>;
}

export interface IGetUserPollsList {
    execute(userId: string): Promise<ListPoll[]>;
}