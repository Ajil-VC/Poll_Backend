import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interface/auth.controller.interface";
import { HttpStatusCode } from "../../infrastructure/config/http-status-enum";
import { RESPONSE_MESSAGES } from "../../infrastructure/config/response.msg";
import { IGetUserByIdUsecase, ISigninUsecase, ISignUpUseCase } from "../../application/usecaseInterface/auth.di";
import { ResponseDTO } from "../DTO/DTO/response.dto";
import { User } from "../../domain/entities/user.type";


export class AuthController implements IAuthController {

    constructor(
        private _signinUsecase: ISigninUsecase,
        private _signupUsecase: ISignUpUseCase,
        private _getUserByIdUsecase: IGetUserByIdUsecase
    ) { }

    authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const user = await this._getUserByIdUsecase.execute(req.user.id);
            const response: ResponseDTO<User> = {
                status: true,
                message: RESPONSE_MESSAGES.COMMON.SUCCESS,
                data: user
            }

            res.status(HttpStatusCode.OK).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const { email, password } = req.body;

            const result = await this._signinUsecase.execute(email, password);

            if (!result.status) {

                const response: ResponseDTO<null> = {
                    status: false,
                    message: RESPONSE_MESSAGES.AUTH.INVALID_CREDENTIALS,
                    data: null
                }
                res.status(HttpStatusCode.BAD_REQUEST).json(response);
                return;
            }

            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: false, //If it is https set it as true.
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(HttpStatusCode.OK).json({
                status: true,
                token: result.token,
                data: result.additional
            });

        } catch (err) {

            next(err)
        }

    }

    signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const { email, password, userName } = req.body;
            const result = await this._signupUsecase.execute(email, password, userName);

            if (!result.status) {
                const response: ResponseDTO<null> = {
                    status: false,
                    message: result.message,
                    data: null
                }
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(response);
                return;
            }

            const response: ResponseDTO<User | undefined> = {
                status: true,
                message: RESPONSE_MESSAGES.COMMON.SUCCESS,
                data: result.additional
            }
            res.status(HttpStatusCode.CREATED).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }

}