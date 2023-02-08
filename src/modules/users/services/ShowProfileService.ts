import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { User } from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

interface IRequest {
    user_id: string;
}

export class ShowProfileService {

    public async execute({ user_id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(user_id);
        if (!user){
            throw new AppError('User not found');
        }
        return user;
    }
}
