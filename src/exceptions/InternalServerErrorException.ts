import { HttpException } from './HttpException';

export class InternalServerError extends HttpException {
    constructor() {
        super('Internal server error.', 500);
    }
}
