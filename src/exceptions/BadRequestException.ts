import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
    constructor() {
        super('Bad Request', 400);
    }
}
