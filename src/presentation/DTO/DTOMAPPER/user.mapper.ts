
import { User } from "../../../domain/entities/user.type";
import { UserDocument } from "../../../infrastructure/database/model/user.interface";

export class UserMapper {
    static toResponseDTO(user: UserDocument): User {
        return {

            id: user._id.toString(),
            userName: user.userName.toString(),
            email: user.email.toString(),
            password: user.password,
            isAdmin: user.isAdmin,
            ...(user.createdAt && { createdAt: user.createdAt }),
            ...(user.updatedAt && { updatedAt: user.updatedAt }),
        };
    }
}



export class UserResponseMapper {
    static toResponseDTO(user: User): User {
        return {

            id: user.id,
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
            ...(user.createdAt && { createdAt: user.createdAt }),
            ...(user.updatedAt && { updatedAt: user.updatedAt }),
        };
    }
}
