import { getCustomRepository } from "typeorm";
import { Customer } from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

interface SearchParams {
    page: number;
    limit: number;
}

interface IPaginateCustomer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    last_page: number;
    data: Customer[];
}

export class ListCustomerService {    

    public async execute({page, limit}: SearchParams): Promise<IPaginateCustomer> {
        const take = limit;
        const skip = (Number(page) - 1) * take;
        const customersRepository = new CustomersRepository();
        
        const customers = await customersRepository.findAll({ page, skip, take });
        return customers as IPaginateCustomer;
    }
}
