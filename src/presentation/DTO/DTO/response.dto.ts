
export interface ResponseDTO<T> {
    status: boolean,
    message: string,
    data: T
}