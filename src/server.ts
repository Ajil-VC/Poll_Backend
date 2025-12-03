import express from 'express';
import { config } from './infrastructure/config/config';
import cors from 'cors';
import userRouter from './presentation/routes/user.routes';
import { AppError } from './shared/error';
import connectDB from './infrastructure/config/connectDB';
import http from 'http';
import { setupSocket } from './infrastructure/config/socket/socket';

const app = express();
connectDB();

const server = http.createServer(app);
setupSocket(server);

app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());

app.use('/api/v1', userRouter);

app.use((err: AppError, req: express.Request, res: express.Response, next: express.NextFunction) => {


    if (err.name === "ValidationError") {
        res.status(400).json({
            status: false,
            message: "Validation failed",
        });
        return;
    }

    if (err.code === 11000) {
        res.status(409).json({
            status: false,
            message: "Duplication error",
        });
        return;
    }

    if (err.name === 'TypeError') {
        res.status(400).json({ status: false, message: 'Unexpected error occured.' });
        return;
    }

    if (err.name === "BSONError") {
        res.status(400).json({ status: false, message: "Please re ensure the operation, something is wrong." });
        return;
    }

    if (err.name === "CastError") {
        res.status(400).json({
            status: false,
            message: "Invalid ID format"
        });
        return;
    }

    res.status(500).json({ message: err.message });
});


server.listen(config.PORT, () => {
    console.log(`Poll is listening at port : http://localhost:${config.PORT}`);
})