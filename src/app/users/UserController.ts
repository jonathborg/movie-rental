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
            throw new NotFoundException();
        }
        return res.json(updatedUser);
    }

    delete(req: Request, res: Response): Response<void> {
        const obj = {};
        obj.teste.alo = 123;
        return res.json({ message: 'OK' });
    }

    // async delete(req: Request, res: Response): Promise<Response<void>> {
    //     const userId = Number(req.params.id);
    //     const userDeleted = await this.userService.delete(userId);
    //     if (!userDeleted) {
    //         throw new NotFoundException();
    //     }
    //     return res.status(204).send();
    // }
}
