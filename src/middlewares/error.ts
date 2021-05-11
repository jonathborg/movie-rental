import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { InternalServerError } from '../exceptions/InternalServerErrorException';

export const error = (
    err: ErrorRequestHandler,
    _req: Request,
    res: Response,
    _next: NextFunction,
): Response => {
    if (err instanceof HttpException) {
        return res.status(err.status).json({ message: err.message });
    }
    console.log(err);
    const internalError = new InternalServerError();
    return res.status(internalError.status).json({ message: '500 no middleware de erro.' });
};
