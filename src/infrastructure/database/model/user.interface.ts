import { Document } from "mongoose";

export interface UserDocument extends Document {

    userName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;

}