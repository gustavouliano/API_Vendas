import { Request, Response, Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import { usersRoutes } from '@modules/users/routes/users.routes';
import { sessionsRouter } from '@modules/users/routes/sessions.routes';
import { passwordRouter } from '@modules/users/routes/password.routes';
import { profileRouter } from '@modules/users/routes/profile.routes';
import customersRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

// Rotas de produtos
routes.use('/products', productsRouter);
// Rotas de usuários
routes.use('/users', usersRoutes);
// Rotas de sessões de usuário
routes.use('/sessions', sessionsRouter);
// Rotas de senhas do usuário (forgot, reset...)
routes.use('/password', passwordRouter);
// Rotas de profile do usuário. (atualizar os dados)
routes.use('/profile', profileRouter);
// Rotas de clientes
routes.use('/customers', customersRouter);

routes.get('/', (req: Request, res: Response) => {
    return res.json({ msg: 'Foi!' });
});

export default routes;