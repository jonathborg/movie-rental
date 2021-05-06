import { HttpException } from './HttpException';

export class InternalServerError extends HttpException {
    constructor() {
        super('Internal Server Error', 500);
    }
}
