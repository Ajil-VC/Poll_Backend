import { User } from "./user.type";

export interface Message {

    id: string;
    user: User,
    message: string,
    pollId: string,
    type: "text" | "system",

    createdAt?: Date,
    updatedAt?: Date,
}