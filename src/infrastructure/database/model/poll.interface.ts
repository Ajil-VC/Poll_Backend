import { Document, Types } from "mongoose";

export interface PollDocument extends Document {

    question: string,
    options: [
        {
            _id: Types.ObjectId
            text: string,
            voteCount: number,
        }
    ],
    url: string,
    createdBy: Types.ObjectId,
    createdAt: Date,
    expiresAt: Date,
    isActive: boolean
}