import { NextFunction, Request, Response } from "express";


export interface IMessageController {

    sendMessage(req: Request, res: Response, next: NextFunction): Promise<void>;
}