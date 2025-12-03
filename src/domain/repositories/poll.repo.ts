import { PollDocument } from "../../infrastructure/database/model/poll.interface";

export interface IPollRepository {

    createPoll(question: string, options: Array<string>, frontendURL: string, userId: string): Promise<PollDocument>;
    getPolls(userId: string): Promise<PollDocument[]>;

    getPollWithId(id: string): Promise<PollDocument>;

    giveVote(pollId: string, optionId: string, userId: string): Promise<PollDocument>;
}