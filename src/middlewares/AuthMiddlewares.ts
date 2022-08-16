import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';

//{userToken: id}, process.env.SECRET + id, { expiresIn: 300 }
interface IToken {
    userToken: string;
    iat: number;
    exp: number
}

export default async function AuthController(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers
    if(!authorization) {
        return response.status(401).end()
    }

    const token = authorization.replace('Bearer', '').trim();
    try{
        const data = JWT.verify(token, process.env.SECRET);
        const { userToken } = data as IToken;
        request.user = userToken;

        return next();
    } catch {
        return response.status(401).end()
    }
}