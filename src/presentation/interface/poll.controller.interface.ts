import { NextFunction, Request, Response } from "express";


export interface IPollController {

    createPoll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPolls(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPollWithId(req: Request, res: Response, next: NextFunction): Promise<void>;

    giveVote(req: Request, res: Response, next: NextFunction): Promise<void>;
}