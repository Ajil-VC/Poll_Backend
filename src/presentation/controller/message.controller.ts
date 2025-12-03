import { Request, Response, NextFunction } from "express";
import { IMessageController } from "../interface/message.controller.interface";




export class MessageController implements IMessageController {

    constructor() { }

    sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const { pollId, message } = req.body;
            console.log(pollId, message);

        } catch (err) {

        }
    }
}