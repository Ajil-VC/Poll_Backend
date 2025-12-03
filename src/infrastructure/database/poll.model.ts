import mongoose, { model, Schema, Types } from "mongoose";
import { PollDocument } from "./model/poll.interface";


const pollSchema = new Schema<PollDocument>({

    question: { type: String },
    options: [
        {
            text: { type: String },
            voteCount: { type: Number, default: 0 }
        }
    ],
    url: { type: String, default: '' },
    createdBy: { type: Types.ObjectId, ref: "User" },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true }

}, { timestamps: true });

const pollModel = mongoose.models.Activity || model<PollDocument>('Poll', pollSchema);
export default pollModel;