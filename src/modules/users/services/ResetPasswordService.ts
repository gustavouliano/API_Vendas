import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import UserTokensRepository from "../infra/typeorm/repositories/UserTokensRepository";
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
    token: string;
    password: string;
}

export default class ResetPasswordService {

    public async execute({token, password}: IRequest): Promise<void> {
        const userTokensRepository = getCustomRepository(UserTokensRepository);
        const usersRepository = getCustomRepository(UsersRepository);

        const userToken = await userTokensRepository.findByToken(token);
        if (!userToken){
            throw new AppError('User Token does not exists');
        }
        const user = await usersRepository.findById(userToken.user_id);
        if (!user){
            throw new AppError('User does not exists');
        }
        
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)){
            // Se a data atual está depois da data de criação do token + 2h
            throw new AppError('Token expired');
        }
        const hashedPassword = await hash(password, 8);
        user.password = hashedPassword;
        usersRepository.save(user);
    }
}
