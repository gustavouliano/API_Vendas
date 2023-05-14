import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";
import { ICustomerPaginate } from "../models/ICustomerPaginate";

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

export interface ICustomersRepository {
    findByName(name: string): Promise<ICustomer | null>;
    findById(id: string): Promise<ICustomer | null>;
    findByEmail(email: string): Promise<ICustomer | null>;
    findAll(params: SearchParams): Promise<ICustomerPaginate>;
    create(data: ICreateCustomer): Promise<ICustomer>;
    save(customer: ICustomer): Promise<ICustomer>;
}