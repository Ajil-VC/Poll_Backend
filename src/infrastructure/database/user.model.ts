
import mongoose, { Schema, model } from "mongoose";
import { UserDocument } from "./model/user.interface";

const userSchema = new Schema<UserDocument>({

    userName: { type: String, default: 'New User' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false }

}, { timestamps: true })


const userModel = mongoose.models.User || model<UserDocument>('User', userSchema);
export default userModel;