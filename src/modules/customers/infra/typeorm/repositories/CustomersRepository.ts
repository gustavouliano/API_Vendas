import { ICustomersRepository, SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';
import { Repository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { dataSource } from '@shared/infra/typeorm';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';

class CustomersRepository implements ICustomersRepository {

    private ormRepository: Repository<Customer>;

    constructor(){
        this.ormRepository = dataSource.getRepository(Customer);
    }

    public async findByName(name: string): Promise<Customer | null> {
        const customer = await this.ormRepository.findOneBy({
            name
        });
        return customer;
    }

    public async findById(id: string): Promise<Customer | null> {
        const customer = await this.ormRepository.findOneBy({
            id
        });
        return customer;
    }

    public async findByEmail(email: string): Promise<Customer | null> {
        const customer = await this.ormRepository.findOneBy({
            email
        });
        return customer;
    }

    public async findAll({page, skip, take}: SearchParams): Promise<ICustomerPaginate> {
        const [customers, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount();
        const result: ICustomerPaginate = {
            per_page: take,
            total: count,
            current_page: page,
            data: customers
        }
        return result;
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