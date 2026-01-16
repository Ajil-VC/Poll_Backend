import { useCaseResult } from "../../../domain/entities/usecase.result";
import { IUserRepository } from "../../../domain/repositories/user.repo";
import { config } from "../../../infrastructure/config/config";
import { IGetRefreshTokenUsecase } from "../../usecaseInterface/auth.di";
import jwt from 'jsonwebtoken';

export class GetRefreshTokenUsecase implements IGetRefreshTokenUsecase {

    constructor(private _userRepo: IUserRepository) { }

    async execute(refreshToken: string): Promise<useCaseResult<any>> {

        if (!config.REFRESH_TOKEN_SECRET) {
            throw new Error('Something went wrong while getting new token.');
        }
        const userPayload = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);

        if (!userPayload || typeof userPayload === 'string' || !('userId' in userPayload)) {

            return {
                status: false,
                message: 'Invalid or expired refresh token',
            }
        }

        const userData = await this._userRepo.findUserById((userPayload as jwt.JwtPayload).userId);

        if (!userData) {
            throw new Error('Userdata not available.');
        }

        if (!config.JWT_SECRETKEY) {
            throw new Error('JWT secret key is not defined.');
        }

        if(!config.JWT_EXPIRES_IN){
            throw new Error('Expiration time not set for jwt.');
        }
        const token = jwt.sign(
            {
                id: userData._id,
                email: userData.email,
                name: userData.userName,
            },
            config.JWT_SECRETKEY as string,
            { expiresIn: config.JWT_EXPIRES_IN }
        );


        return {
            status: true,
            message: 'Token ready',
            token: token,
        }
    }
}
