import { Types } from "mongoose";

export interface VoteDocument extends Document {

    pollId: Types.ObjectId,
    userId: Types.ObjectId,
    optionId: Types.ObjectId
}