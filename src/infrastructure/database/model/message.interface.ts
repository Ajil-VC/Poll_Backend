import { Types } from "mongoose";
import { UserDocument } from "./user.interface";

export interface MessageDocument extends Document {

    _id: Types.ObjectId
    userId: Types.ObjectId,
    message: String,
    pollId: Types.ObjectId,
    type: "text" | "system",

    createdAt?: Date;
    updatedAt?: Date;
}

export interface MessageWithUser extends Omit<MessageDocument, 'userId'> {
    userId: UserDocument
}