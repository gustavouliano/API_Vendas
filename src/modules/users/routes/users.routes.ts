import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from '@config/upload';
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { UserAvatarController } from "../controllers/UserAvatarController";

const usersRoutes = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);


usersRoutes.get('/', isAuthenticated, usersController.index);

usersRoutes.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
}), usersController.create);


usersRoutes.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'), // Upload de um único arquivo 
    usersAvatarController.update
);

export { usersRoutes };
