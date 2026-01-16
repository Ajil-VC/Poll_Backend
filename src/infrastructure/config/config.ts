import dotenv from 'dotenv';
import type { StringValue } from 'ms';

dotenv.config();

export const config = {

    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRETKEY: process.env.JWT_SECRETKEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as StringValue,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}