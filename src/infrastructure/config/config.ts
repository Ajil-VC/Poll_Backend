import dotenv from 'dotenv';
dotenv.config();

export const config = {

    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRETKEY: process.env.JWT_SECRETKEY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}