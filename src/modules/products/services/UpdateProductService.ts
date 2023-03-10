import redisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductsRepository } from "../infra/typeorm/repositories/ProductsRepository";

type IRequest = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class UpdateProductService {    

    public async execute({id, name, price, quantity}: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);
        if (!product){
            throw new AppError(`Product with id ${id} not found`);
        }

        const productNameExists = await productsRepository.findByName(name);
        if (productNameExists && product.name != name){
            throw new AppError('There is already a product with this name');
        }

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);
        return product;
    }
}