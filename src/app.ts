import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import router from './router/apiRouter';
import globalErrorHandler from './middleware/globalErrorHandler';
import responseMessage from './constant/responseMessage';
import httpError from './util/httpError';

const app: express.Application = express();

//Middleware

app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

//Router
app.use('/api/v1', router)

// 404 Error Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'));
    } catch (err) {
        httpError(next, err, req, 404);
    }
})

// Global Error Handler
app.use(globalErrorHandler)

export default app;