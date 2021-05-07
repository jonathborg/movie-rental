import { Request, Response } from 'express';
import { UserService } from './UserService';
import { User } from './UserDto';
import { NotFoundException } from 'src/exceptions/NotFoundException';
export class UserController {
    constructor(private userService: UserService) {}

    async list(_req: Request, res: Response): Promise<Response<User[]>> {
        const users = await this.userService.find();
        return res.json(users);
    }

    async show(req: Request, res: Response): Promise<Response<User>> {
        const userId = Number(req.params.id);
        const user = await this.userService.findById(userId);
        if (!user) {
            // not hitting error middleware
            throw new NotFoundException();
        }
        return res.json(user);
    }

    async create(req: Request, res: Response): Promise<Response<User>> {
        const createdUser = await this.userService.create(req.body);
        return res.status(201).json(createdUser);
    }

    async create2(req: Request, res: Response): Promise<Response<User>> {
        return this.userService.create(req.body).then(res.status(201).json);
    }

    async edit(req: Request, res: Response): Promise<Response<User>> {
        const userId = Number(req.params.id);
        const updatedUser = await this.userService.update(userId, req.body);
        if (!updatedUser) {
            // not hitting error middleware
            throw new NotFoundException();
        }
        return res.json(updatedUser);
    }

    async delete(req: Request, res: Response): Promise<Response<void>> {
        const userId = Number(req.params.id);
        const userDeleted = await this.userService.delete(userId);
        if (!userDeleted) {
            // not hitting error middleware
            throw new NotFoundException();
        }
        return res.status(204).send();
    }
}
