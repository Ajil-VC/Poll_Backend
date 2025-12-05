import { NextFunction, Request, Response } from "express";


export interface IPollController {

    createPoll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPolls(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPollWithId(req: Request, res: Response, next: NextFunction): Promise<void>;

    getUserPollsList(req: Request, res: Response, next: NextFunction): Promise<void>;
}