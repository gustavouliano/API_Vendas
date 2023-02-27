import AppError from "@shared/errors/AppError";
import { inject } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { User } from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {

    constructor(
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({name, email, password}: IRequest): Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists){
            throw new AppError('Email address already used');
        }
        
        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = usersRepository.create({
            name, 
            email, 
            password: hashedPassword
        });
        await usersRepository.save(user);
        return user;
    }
}
