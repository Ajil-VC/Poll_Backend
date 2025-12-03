import { config } from "../../../infrastructure/config/config";
import jwt from 'jsonwebtoken';
import { ISigninUsecase } from "../../usecaseInterface/auth.di";
import { useCaseResult } from "../../../domain/entities/usecase.result";
import { ISecurePassword } from "../../../domain/services/securePassword.interface";
import { IUserRepository } from "../../../domain/repositories/user.repo";
import { User } from "../../../domain/entities/user.type";
import { UserResponseMapper } from "../../../presentation/DTO/DTOMAPPER/user.mapper";


export class SigninUseCase implements ISigninUsecase {

    constructor(
        private _userRepo: IUserRepository,
        private _vPassword: ISecurePassword
    ) { }

    async execute(email: string, passWord: string): Promise<useCaseResult<User>> {

        const userData = await this._userRepo.findUserByEmail(email);

        if (!userData) {
            return { status: false, message: 'Invalid credentials.' };
        }

        const isPassWordValid = await this._vPassword.validatePassword(passWord, userData?.password as string);

        if (!isPassWordValid) {
            return { status: false, message: 'Invalid Credentials' }
        }


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
            { expiresIn: '15m' }
        );

        if (!config.REFRESH_TOKEN_SECRET) {
            return { status: false, message: 'Not able to get refresh token' }
        }
        const refreshToken = jwt.sign(
            { userId: userData.id },
            config.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        )

        const userWithoutPswd = UserResponseMapper.toResponseDTO(userData);

        return {
            status: true,
            message: 'Token Created',
            token: token,
            additional: userWithoutPswd,
            refreshToken
        };
    }
}