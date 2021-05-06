import { Request, Response } from 'express';
import { UserService } from './UserService';

export class UserController {
    constructor(private userService: UserService) {}

    index(_req: Request, res: Response) {
        return this.userService.find().then((data) => res.json(data));
    }

    show(): number {
        return 1;
    }

    create(): number {
        return 1;
    }

    update(): number {
        return 1;
    }

    destroy(): number {
        return 1;
    }
}
