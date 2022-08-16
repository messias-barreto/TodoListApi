import { Request, Response } from "express";
import { authUser, createUser as createUserService, findAllUsers, findUser, updateUser } from "../services/UserService"
import jwt from 'jsonwebtoken';
interface IUser {
    name: string;
    login: string;
    password?: string;
    email?: string;
    admin?: boolean;
}
const SECRET = "6e789dd3bbd98e4eeda2e3fa03929ecbecd2bcff";

export class UserController {
    async create(request: Request, response: Response){
        const { name, login, password, email } = request.body
        
        const user = await createUserService({name, login, password, email});
        if(user instanceof Error){
            return response.status(400).json(user.message);
        }    
        return response.status(200).json(user);
    }

    async update (request: Request, response: Response) {
        const { name, login, email, id } = request.body
        const user = await updateUser({ name, login, email, id})

        if(user instanceof Error){
            return response.status(400).json(user.message)
        }
        return response.status(200).json(user)
    }

    async AllUsers(request: Request, response: Response) {
        const user = await findAllUsers();
        return response.status(200).json(user);
    }

    async findOneUser(request: Request, response: Response) {
        const { id } = request.params;

        const user = await findUser(id);
        return response.status(200).json(user);
    }

    async findAuthUser(request: Request, response: Response) {
        const { login, password } = request.body;

        const user = await authUser(login, password);
        return response.status(user.status).json(user);
    }
}