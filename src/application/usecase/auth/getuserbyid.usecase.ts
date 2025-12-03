import { User } from "../../../domain/entities/user.type";
import { IUserRepository } from "../../../domain/repositories/user.repo";
import { UserMapper, UserResponseMapper } from "../../../presentation/DTO/DTOMAPPER/user.mapper";
import { IGetUserByIdUsecase } from "../../usecaseInterface/auth.di";


export class GetUserByIdUsecase implements IGetUserByIdUsecase {

    constructor(private userRepo: IUserRepository) { }

    execute = async (id: string): Promise<User> => {

        const user = await this.userRepo.findUserById(id);
        if (!user) throw new Error('User Couldnt findout');
        const userWithPswd = UserMapper.toResponseDTO(user);
        return UserResponseMapper.toResponseDTO(userWithPswd);
    }

}