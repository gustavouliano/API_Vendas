import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { passwordRouter } from '@modules/users/infra/http/routes/password.routes';
import { profileRouter } from '@modules/users/infra/http/routes/profile.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

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
// Rotas de pedidos
routes.use('/orders', ordersRouter);

export default routes;