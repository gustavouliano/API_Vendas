import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../infra/typeorm/entities/Order";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

export class CreateOrderService {    

    public async execute({ customer_id, products }: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductsRepository);

        const customerExists = await customersRepository.findById(customer_id);

        if (!customerExists){
            throw new AppError('Could not find any customer with the given id');
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if (!existsProducts.length){
            throw new AppError('Could not find any products with the given ids');
        }

        const existsProductsIds = existsProducts.map(product => product.id);
        const checkInexistentProducts = products.filter((product) => {
            return !existsProductsIds.includes(product.id);
        });

        if (checkInexistentProducts.length){
            throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);
        }

        const quantityAvailable = products.filter(
            product => 
                existsProducts.filter(p => p.id == product.id)[0].quantity < product.quantity
        );

        if (quantityAvailable.length){
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`
            );
        }

        const serializedProducts = products.map((product) => {
            const price = existsProducts.filter(p => p.id == product.id)[0].price;
            return {
                product_id: product.id,
                quantity: product.quantity,
                price
            }
        });

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts
        });

        const { order_products } = order;
        const updatedProductQuantity = order_products.map(
            product => {
                const newQuantity = existsProducts.filter(
                    p => p.id == product.product_id
                )[0].quantity - product.quantity;                
                return {
                    id: product.product_id,
                    quantity: newQuantity
                }
            }
        );
        await productsRepository.save(updatedProductQuantity);
        return order;
    }
}
