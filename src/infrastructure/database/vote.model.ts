import mongoose, { model, Schema, Types } from "mongoose";
import { VoteDocument } from "./model/vote.interface";

const voteSchema = new Schema<VoteDocument>({

    pollId: { type: Types.ObjectId, ref: "Poll" },
    userId: { type: Types.ObjectId, ref: "User" },
    optionId: { type: Types.ObjectId }

}, { timestamps: true });

const voteModel = mongoose.models.Activity || model<VoteDocument>('Vote', voteSchema);
export default voteModel;

