import { IUserRepository } from "../../../domain/repositories/user.repo";
import { ISecurePassword } from "../../../domain/services/securePassword.interface";
import jwt from 'jsonwebtoken';
import { config } from "../../../infrastructure/config/config";
import { ISignUpUseCase } from "../../usecaseInterface/auth.di";
import { User } from "../../../domain/entities/user.type";
import { useCaseResult } from "../../../domain/entities/usecase.result";
import { UserResponseMapper } from "../../../presentation/DTO/DTOMAPPER/user.mapper";

export class SignUpUseCase implements ISignUpUseCase {

    constructor(
        private _securePassword: ISecurePassword,
        private _userRepo: IUserRepository
    ) { }

    async execute(email: string, passWord: string, userName: string): Promise<useCaseResult<User>> {

        try {

            const isUserExists = await this._userRepo.findUserByEmail(email);
            if (isUserExists) return { status: false, message: 'Email already in use' };

            const hashedPassword = await this._securePassword.secure(passWord);
            if (!hashedPassword) return { status: false, message: 'Password couldnt secured' };

            const userData = await this._userRepo.createUser(
                email,
                hashedPassword,
                userName
            );
            if (!userData) return { status: false, message: 'User Data not available' };

            if (userData) {

                if (!config.JWT_SECRETKEY) {
                    throw new Error('JWT secret key is not defined.');
                }

                const token = jwt.sign(
                    {
                        id: userData.id,
                        email: userData.email,
                        userName: userData.userName

                    },
                    config.JWT_SECRETKEY,
                    { expiresIn: '1h' }
                )

                const userWithoutPswd = UserResponseMapper.toResponseDTO(userData);
                return { status: true, token, message: 'User created Successfully', additional: userWithoutPswd };

            }

            // If it reaches here we can revert the operations(Only optional).
            return { status: true, message: 'Something went wrong while signing up.' };

        } catch (err) {
            console.error('Something went wrong while signing up.', err);
            return { status: false, message: 'Unknown_Error' };
        }


    }
}