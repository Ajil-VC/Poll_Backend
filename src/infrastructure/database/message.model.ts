import { Schema, Types } from "mongoose";
import { MessageDocument } from "./model/message.interface";
import mongoose from "mongoose";
import { model } from "mongoose";




const messageSchema = new Schema<MessageDocument>({

    userId: { type: Types.ObjectId, ref: "User" },
    message: { type: String },
    pollId: { type: Types.ObjectId },
    type: { type: String, enum: ["text", "system"], default: 'text' },

}, { timestamps: true });

const messageModel = mongoose.models.Activity || model<MessageDocument>('Message', messageSchema);
export default messageModel;