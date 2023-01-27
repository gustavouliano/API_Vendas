import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import uploadConfig from '@config/upload';
import fs from 'fs';
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";

interface IRequest {
    userId: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {

    public async execute({userId, avatarFilename}: IRequest): Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);
        const diskStorageProvider = new DiskStorageProvider();
        
        const user = await usersRepository.findById(userId);
        if (!user){
            throw new AppError('User not found');
        }
        if (user.avatar){
            await diskStorageProvider.deleteFile(user.avatar);
        }
        const filename = await diskStorageProvider.saveFile(avatarFilename);
        user.avatar = filename;
        
        await usersRepository.save(user);
        return user;
    }
}

export { UpdateUserAvatarService };