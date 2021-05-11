import express, { NextFunction, Request, Response, Router } from 'express';
import { RequestHandler } from 'express';
import { HttpException } from 'src/exceptions/HttpException';
import { InternalServerError } from 'src/exceptions/InternalServerErrorException';

export type Route = {
    method: 'ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
    path: string;
    handler: RequestHandler;
};

export function router(routes: Route[]): Router {
    const router = express.Router();
    for (const route of routes) {
        const asyncHandler = (
            fn: (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => Promise<Record<string, unknown>> | Record<string, unknown>,
        ) => (req: Request, res: Response, next: NextFunction) => {
            const fnExec = fn(req, res, next);
            if (fnExec instanceof Promise) {
                fnExec.catch((err) => {
                    const error = err instanceof HttpException ? err : new InternalServerError();
                    res.status(error.status).json({ message: error.message });
                });
            }
        };
        (router as any)[route.method.toLowerCase()](route.path, asyncHandler(route.handler));
    }
    return router;
}
