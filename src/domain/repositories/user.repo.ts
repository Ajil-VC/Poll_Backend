import { UserDocument } from "../../infrastructure/database/model/user.interface";
import { User } from "../entities/user.type"

export interface IUserRepository {

    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: string): Promise<UserDocument | null>;
    createUser(email: string, password: string, userName: string): Promise<User>;
}