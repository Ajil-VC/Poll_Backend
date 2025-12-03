
export interface useCaseResult<T> {
    status: boolean;
    message: string;
    token?: string;
    additional?: T;
    refreshToken?: string;
}