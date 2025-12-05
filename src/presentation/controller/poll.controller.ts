import { Request, Response, NextFunction } from "express";
import { IPollController } from "../interface/poll.controller.interface";
import { ICreatepollUsecase, IGetPollsUsecase, IGetPollWithIDUsecase, IGetUserPollsList } from "../../application/usecaseInterface/poll.di";
import { ResponseDTO } from "../DTO/DTO/response.dto";
import { ListPoll, Poll } from "../../domain/entities/poll.type";
import { RESPONSE_MESSAGES } from "../../infrastructure/config/response.msg";
import { HttpStatusCode } from "../../infrastructure/config/http-status-enum";



export class PollController implements IPollController {

    constructor(
        private _createPoll: ICreatepollUsecase,
        private _getPolls: IGetPollsUsecase,
        private _getPollWithId: IGetPollWithIDUsecase,
        private _getUserPollsList: IGetUserPollsList
    ) { }


    getUserPollsList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const pollList = await this._getUserPollsList.execute(req.user.id);
            const response: ResponseDTO<ListPoll[]> = {
                status: true,
                message: RESPONSE_MESSAGES.COMMON.SUCCESS,
                data: pollList
            }

            res.status(HttpStatusCode.OK).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }


    getPollWithId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const pollId = req.params.id;
            if (!pollId) {
                res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: RESPONSE_MESSAGES.COMMON.COULDNT_FETCH });
                return;
            }

            const result = await this._getPollWithId.execute(pollId);
            const response: ResponseDTO<Poll> = {
                status: true,
                message: RESPONSE_MESSAGES.COMMON.SUCCESS,
                data: result
            }
            res.status(HttpStatusCode.OK).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }

    getPolls = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const polls = await this._getPolls.execute(req.user.id);
            const response: ResponseDTO<Poll[]> = {
                status: true,
                message: RESPONSE_MESSAGES.COMMON.SUCCESS,
                data: polls
            }
            res.status(HttpStatusCode.OK).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }

    createPoll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            console.log(req.user)
            const { question, options } = req.body;
            const result = await this._createPoll.execute(question, options, req.user.id);

            const response: ResponseDTO<Poll> = { status: true, message: RESPONSE_MESSAGES.COMMON.SUCCESS, data: result };
            res.status(HttpStatusCode.CREATED).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }


}