import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../../infrastructure/config/config";
import { HttpStatusCode } from "../../infrastructure/config/http-status-enum";


/* eslint-disable @typescript-eslint/no-namespace */
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
/* eslint-enable @typescript-eslint/no-namespace */

function verifyToken(token: string, secret: string): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}


export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ status: false, message: 'Unauthorized: Token missing or invalid token' });
        return
    }

    const token = authHeader.split(' ')[1];

    if (!config.JWT_SECRETKEY) {
        throw new Error('JWT secret key is not defined.');
    }


    try {

        if (!token) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ status: false, message: 'Couldnt verify user.' });
            return;
        }
        const decoded: any = await verifyToken(token, config.JWT_SECRETKEY);
        req.user = decoded;

        next();

    } catch (err: any) {

        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            res.status(401).json({ status: false, message: 'Invalid or expired token.' });
            return
        }

        next(err);
    }

}