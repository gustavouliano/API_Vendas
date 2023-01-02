import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;

}
 
function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization; // Onde deve estar o TOKEN.
    if (!authHeader){
        throw new AppError('JWT Token is missing');
    }

    /**
     * Token vem como: 'Bearer token'
     * Bearer afpsokgijehugafkjsl
     */

    //Desestruturar, pegando o segundo índice do array gerado pelo split
    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        const { sub } = decodedToken as ITokenPayload; // Sub será o ID do user
        req.user = {
            id: sub
        };
        return next();
    } catch (error) {
        throw new AppError('Invalid JWT');
    }
}

export default isAuthenticated;