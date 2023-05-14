import { Request, Response } from "express";
import { CreateCustomerService } from "../../../services/CreateCustomerService";
import { DeleteCustomerService } from "../../../services/DeleteCustomerServiec";
import { ListCustomerService } from "../../../services/ListCustomerService";
import { ShowCustomerService } from "../../../services/ShowCustomerService";
import { UpdateCustomerService } from "../../../services/UpdateCustomerService";
import { container }  from 'tsyringe';

export class CustomersController {

    public async index(req: Request, res: Response): Promise<Response> {
        const page = req.query.page ?  Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 15;
        const listCustomerSerivice = new ListCustomerService();
        
        const customers = await listCustomerSerivice.execute({ page, limit });
        return res.json(customers);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const showCustomerService = new ShowCustomerService()
        const { id } = req.params;

        const customer = await showCustomerService.execute({ id });
        return res.json(customer);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const createCustomerService = container.resolve(CreateCustomerService);

        const { name, email } = req.body;
        const customer = await createCustomerService.execute({
            name,
            email
        });
        return res.json(customer);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const updateCustomerService = new UpdateCustomerService();

        const { name, email } = req.body;
        const { id } = req.params;

        const customer = await updateCustomerService.execute({
            id,
            name,
            email
        });
        return res.json(customer);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const deleteCustomerService = new DeleteCustomerService();

        const { id } = req.params;

        await deleteCustomerService.execute({ id });
        return res.json([]);
    }

}