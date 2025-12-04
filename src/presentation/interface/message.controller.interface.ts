import { NextFunction, Request, Response } from "express";
import { Message } from "../../domain/entities/message.type";


export interface IMessageController {

    getMessages(req: Request, res: Response, next: NextFunction): Promise<void>;
}