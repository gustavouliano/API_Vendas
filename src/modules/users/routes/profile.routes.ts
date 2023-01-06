import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { ProfileController } from "../controllers/ProfileController";

const profileRouter = Router();
const profileControler = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileControler.show);
profileRouter.put('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        old_password: Joi.string(),
        password: Joi.string().optional(),
        password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
            is: Joi.exist(),
            then: Joi.required()
        })
    }
}), profileControler.update);

export { profileRouter };
