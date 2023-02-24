import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { getRepository } from 'typeorm';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';

class CustomersRepository implements ICustomersRepository {

    private ormRepository: Repository<Customer>;

    constructor(){
        this.ormRepository = getRepository(Customer);
    }

    public async findByName(name: string): Promise<Customer|undefined> {
        const customer = await this.ormRepository.findOne({
            where: { name }
        });
        return customer;
    }

    public async findById(id: string): Promise<Customer|undefined> {
        const customer = await this.ormRepository.findOne({
            where: { id }
        });
        return customer;
    }

    public async findByEmail(email: string): Promise<Customer|undefined> {
        const customer = await this.ormRepository.findOne({
            where: { email }
        });
        return customer;
    }

    public async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = this.ormRepository.create({ name, email });
        await this.ormRepository.save(customer);
        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        return await this.ormRepository.save(customer);
    }

    public async remove(customer: Customer): Promise<Customer> {
        return await this.ormRepository.remove(customer);
    }

    public createQueryBuilder() {
        return this.ormRepository.createQueryBuilder();
    }
}

export default CustomersRepository;