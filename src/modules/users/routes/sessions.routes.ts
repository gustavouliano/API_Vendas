import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { SessionsController } from "@modules/users/controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', celebrate({
    [Segments.BODY]: {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
}), sessionsController.create);

export { sessionsRouter };
