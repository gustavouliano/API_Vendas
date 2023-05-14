import { DataSource } from "typeorm";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { User } from "@modules/users/infra/typeorm/entities/User";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";
import Product from "@modules/products/infra/typeorm/entities/Product";
import { CreateProducts1670794301296 } from "./migrations/1670794301296-CreateProducts";
import { CreateUsers1671763107730 } from "./migrations/1671763107730-CreateUsers";
import { CreateUserTokens1672540813134 } from "./migrations/1672540813134-CreateUserTokens";
import { CreateCustomers1672974600660 } from "./migrations/1672974600660-CreateCustomers";
import { AddCustomerIdToOrders1673224136416 } from "./migrations/1673224136416-AddCustomerIdToOrders";
import { CreateOrdersProducts1673316523476 } from "./migrations/1673316523476-CreateOrdersProducts";
import { AddOrderIdToOrdersProducts1673402321134 } from "./migrations/1673402321134-AddOrderIdToOrdersProducts";
import { AddProductIdToOrdersProducts1673403607754 } from "./migrations/1673403607754-AddProductIdToOrdersProducts";
import { CreateOrders1673219680699 } from "./migrations/1673219680699-CreateOrders";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin123',
    database: 'apivendas',
    entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
    migrations: [
        CreateProducts1670794301296,
        CreateUsers1671763107730,
        CreateUserTokens1672540813134,
        CreateCustomers1672974600660,
        CreateOrders1673219680699,
        AddCustomerIdToOrders1673224136416,
        CreateOrdersProducts1673316523476,
        AddOrderIdToOrdersProducts1673402321134,
        AddProductIdToOrdersProducts1673403607754,
    ]
});