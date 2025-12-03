import { useCaseResult } from "../../domain/entities/usecase.result";
import { User } from "../../domain/entities/user.type";


export interface ISigninUsecase {
    execute(email: string, passWord: string): Promise<useCaseResult<User>>;
}

export interface ISignUpUseCase {
    execute(email: string, password: string, userName: string): Promise<useCaseResult<User>>;
}

export interface IGetUserByIdUsecase {
    execute(id: string): Promise<User>
}