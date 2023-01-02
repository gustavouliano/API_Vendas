import { Request, Response, Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import { usersRoutes } from '@modules/users/routes/users.routes';
import { sessionsRouter } from '@modules/users/routes/sessions.routes';
import { passwordRouter } from '@modules/users/routes/password.routes';

const routes = Router();

// Rotas de produtos
routes.use('/products', productsRouter);
// Rotas de usuários
routes.use('/users', usersRoutes);
// Rotas de sessões de usuário
routes.use('/sessions', sessionsRouter);
// Rotas de senhas do usuário (forgot, reset...)
routes.use('/password', passwordRouter);

routes.get('/', (req: Request, res: Response) => {
    return res.json({ msg: 'Foi!' });
});

export default routes;