import 'reflect-metadata';
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { CreateCustomerService } from "@modules/customers/services/CreateCustomerService";
import { v4 as uuidv4 } from "uuid";
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import AppError from '@shared/errors/AppError';
import Sinon from 'sinon';

const fakeCustomerRepository: ICustomersRepository = {
    findByName: function (name: string): Promise<ICustomer | undefined> {
        throw new Error('Function not implemented.');
    },
    findById: function (id: string): Promise<ICustomer | undefined> {
        throw new Error('Function not implemented.');
    },
    findByEmail: async function (email: string): Promise<ICustomer | undefined> {
        return undefined;
    },
    create: async function (data: ICreateCustomer): Promise<ICustomer> {
        const customer = new Customer();
        customer.id = uuidv4();
        customer.name = data.name;
        customer.email = data.email;
        return customer;
    },
    save: function (customer: ICustomer): Promise<ICustomer> {
        throw new Error('Function not implemented.');
    }
}

describe('CreateCustomer', () => {
    
    it('should be able to create a new customer', async () => {
        const createCustomer = new CreateCustomerService(fakeCustomerRepository);
        const customer = await createCustomer.execute({email: 'teste@gmail.com', name: 'teste'});
        expect(customer).toHaveProperty('id');
        expect(customer.name).toBe('teste');
        expect(customer.email).toBe('teste@gmail.com');
    });

    it('should not be able to create two customers with the same email', async () => {
        const createCustomer = new CreateCustomerService(fakeCustomerRepository);
        const customer = await createCustomer.execute({email: 'teste@gmail.com', name: 'teste'});
        const sinonFindEmail = Sinon.stub(fakeCustomerRepository, 'findByEmail').callsFake(async (email: string) => {
            return email == customer.email ? customer : undefined;
        });
        expect(
            createCustomer.execute({email: 'teste@gmail.com', name: 'teste'})
        ).rejects.toBeInstanceOf(AppError);
        sinonFindEmail.restore();
    });
});