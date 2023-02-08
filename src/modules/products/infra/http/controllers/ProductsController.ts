import { Request, Response } from "express";
import { CreateProductService } from "../../../services/CreateProductService";
import { DeleteProductService } from "../../../services/DeleteProductService";
import { ListProductService } from "../../../services/ListProductService";
import { ShowProductService } from "../../../services/ShowProductService";
import { UpdateProductService } from "../../../services/UpdateProductService";

export class ProductsController {

    public async index(req: Request, res: Response): Promise<Response> {
        const listProductSerivice = new ListProductService();
        
        const products = await listProductSerivice.execute();
        return res.json(products);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const showProductService = new ShowProductService()
        const { id } = req.params;

        const product = await showProductService.execute({id});
        return res.json(product);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const createProductService = new CreateProductService();

        const { name, price, quantity } = req.body;
        const product = await createProductService.execute({name, price, quantity});
        return res.json(product);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const updateProductService = new UpdateProductService();

        const { name, price, quantity } = req.body;
        const { id } = req.params;

        const product = await updateProductService.execute({id, name, price, quantity});
        return res.json(product);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const deleteProductService = new DeleteProductService();

        const { id } = req.params;

        await deleteProductService.execute({ id });
        return res.json([]);
    }

}