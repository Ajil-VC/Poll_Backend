import { User } from "../../../domain/entities/user.type";
import { IUserRepository } from "../../../domain/repositories/user.repo";
import { UserMapper } from "../../../presentation/DTO/DTOMAPPER/user.mapper";
import { UserDocument } from "../../database/model/user.interface";
import userModel from "../../database/user.model";
import { BaseRepository } from "../base.repository";


export class UserRepositoryImp extends BaseRepository<UserDocument> implements IUserRepository {

    constructor() {
        super(userModel);
    }

    findUserById = async (id: string): Promise<UserDocument | null> => {

        const user = await this.findById(id);
        if (!user) throw new Error('Couldnt retrieve the user data.');
        return user
    }

    createUser = async (email: string, password: string, userName: string): Promise<User> => {

        const newUser = new userModel({
            email,
            password,
            userName
        });

        const createdUser = await newUser.save();
        if (!createdUser) throw new Error('User Couldnt create.');

        return createdUser;

    }

    findUserByEmail = async (email: string): Promise<User | null> => {

        const user = await this.findByEmail(email);
        if (!user) return null;
        return UserMapper.toResponseDTO(user);
    }

}