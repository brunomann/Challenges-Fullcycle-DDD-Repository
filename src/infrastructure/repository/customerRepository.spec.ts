import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customerModel";
import ProductModel from "../db/sequelize/model/productModel";
import CustomerRepository from "./customerRepository";
import ProductRepository from "./productRepository";

describe("Customer repository test unit", () => {

    let sequelize: Sequelize; 

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
            sync: { force: true },
          });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "C1");
        const address = new Address("Rua 1", 320, "12345", "Sapucaia do Sul");
        customer.Address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where:{id:"123"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zip,
            city: address.city,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "C1");
        const address = new Address("Rua 1", 320, "12345", "Sapucaia do Sul");
        customer.Address = address;
        await customerRepository.create(customer);

        customer.changeName("C2");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({where:{id:"123"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zip,
            city: address.city,
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "C1");
        const address = new Address("Rua 1", 320, "12345", "Sapucaia do Sul");
        customer.Address = address;
        await customerRepository.create(customer);

        // await customerRepository.find(customer.id);
        const customerModel = await CustomerModel.findOne({ where: { id: customer.id}});

        expect({
            "active": customer.isActive(),
            "city": customer.address.city,
            "number": customer.address.number,
            "street": customer.address.street,
            "zipCode": customer.address.zip,
            "id": customer.id,
            "name": customer.name,
            "rewardPoints": customer.rewardPoints
        }).toStrictEqual(customerModel.toJSON());
    });

    it("should a error when customer is not find", () =>{
        const customerRepository = new CustomerRepository();

        expect(async () =>{
            await customerRepository.find("ABCDE");
        }).rejects.toThrow("Customer not found");
    })


    it("should find all customers", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "C1");
        const address = new Address("Rua 1", 320, "12345", "Sapucaia do Sul");
        customer.Address = address;
        customer.addRewardPoints(10);

        const customer2 = new Customer("124", "C2");
        const address2 = new Address("Rua 1", 320, "12345", "Sapucaia do Sul");
        customer2.Address = address2;
        customer2.addRewardPoints(15);

        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer);
        expect(customers).toContainEqual(customer2);
    });
});