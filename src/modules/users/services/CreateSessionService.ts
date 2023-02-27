import AppError from "@shared/errors/AppError";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { User } from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import authConfig from '@config/auth';
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import { inject } from "tsyringe";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User,
    token: string
}

export class CreateSessionService {

    constructor(
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({email, password}: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user){
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordConfirmed = await this.hashProvider.compareHash(password, user.password);

        if (!passwordConfirmed){
            throw new AppError('Incorrect email/password combination', 401);
        }

        const token = sign({}, authConfig.jwt.secret!, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });
        return { user, token };
    }
}
