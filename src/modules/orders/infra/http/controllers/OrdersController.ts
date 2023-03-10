import { Request, Response } from "express";
import { CreateOrderService } from "../../../services/CreateOrderService";
import { ShowOrderService } from "../../../services/ShowOrderService";

export class OrdersController {

    public async show(req: Request, res: Response): Promise<Response> {
        const showOrderService = new ShowOrderService();
        const { id } = req.params;

        const order = await showOrderService.execute({ id });
        return res.json(order);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const createOrderService = new CreateOrderService();
        const { customer_id, products } = req.body;
        
        const order = await createOrderService.execute({
            customer_id,
            products
        });
        return res.json(order);
    }

}