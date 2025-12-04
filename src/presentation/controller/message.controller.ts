
import { Request, Response, NextFunction } from "express";
import { IMessageController } from "../interface/message.controller.interface";
import { IGetMessagesUsecase } from "../../application/usecaseInterface/message.di";
import { ResponseDTO } from "../DTO/DTO/response.dto";
import { Message } from "../../domain/entities/message.type";
import { RESPONSE_MESSAGES } from "../../infrastructure/config/response.msg";
import { HttpStatusCode } from "../../infrastructure/config/http-status-enum";




export class MessageController implements IMessageController {

    constructor(private _getMessagesUsecase: IGetMessagesUsecase) { }

    getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const pollId = req.query.pollId;
            if (typeof pollId !== 'string') {
                res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: RESPONSE_MESSAGES.COMMON.BAD_REQUEST });
                return;
            }
            const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;
            const limit = 15;
            const skip = (page - 1) * limit;

            const msgs = await this._getMessagesUsecase.execute(pollId, skip, limit);

            const response: ResponseDTO<Message[]> = {
                status: true,
                message: RESPONSE_MESSAGES.COMMON.SUCCESS,
                data: msgs
            }

            res.status(HttpStatusCode.OK).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }
}