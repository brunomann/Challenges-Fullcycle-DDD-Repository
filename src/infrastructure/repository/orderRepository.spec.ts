import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/orderItem";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customerModel";
import OrderItemModel from "../db/sequelize/model/orderItemModel";
import OrderModel from "../db/sequelize/model/orderModel";
import ProductModel from "../db/sequelize/model/productModel";
import CustomerRepository from "./customerRepository";
import OrderRepository from "./orderRepository";
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
 

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a orderItem",  async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Bruno");
        const address = new Address("1", 320, "22345000", "Sapucaia do Sul");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Creatina", 120);
        const product2 = new Product("2", "Tenis", 100);
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            1
        );

        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            1
        );

        const order = new Order("12345", customer.id, [orderItem, orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        const orderModel2 = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: "12345",
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: product2.id,
                }
            ]
        });
    });

    it("should update a orderItem",  async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Bruno");
        const customer2 = new Customer("1234", "Bruno Mann");
        const address = new Address("1", 320, "22345000", "Sapucaia do Sul");
        customer.changeAddress(address);
        customer2.changeAddress(address);
        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Creatina 150G", 120);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const product2 = new Product("2", "Gatorade", 5);
        await productRepository.create(product2);
        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            1
        );

        const order = new Order("12345", customer.id, [orderItem, orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "12345",
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: product2.id,
                }
            ]
        });

        const product3 = new Product("3", "Creatina 300G", 160);
        await productRepository.create(product3);
        const orderItem3 = new OrderItem(
            "3",
            product3.name,
            product3.price,
            product3.id,
            1
        );
        order.addItem(orderItem3);
        order.changeCustomer(customer2.id);
        await orderRepository.update(order);

        const orderModelUpdated = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        expect(orderModelUpdated.toJSON()).toStrictEqual({
            id: "12345",
            customer_id: customer2.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: product2.id,
                },
                {
                    id: orderItem3.id,
                    name: orderItem3.name,
                    price: orderItem3.price,
                    quantity: orderItem3.quantity,
                    order_id: order.id,
                    product_id: product3.id,
                }
            ]
        });
    });

    it("should find a order especific", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Bruno");
        const address = new Address("1", 320, "22345000", "Sapucaia do Sul");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "SSD 120 GB", 250);
        const product2 = new Product("2", "SSD 240", 489);
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem("1", "O1", product.price, product.id, 2);
        const orderItem2 = new OrderItem("2", "O2", product2.price, product2.id, 1);

        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem, orderItem2]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });
        const orderFounded = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: (await orderFounded).id,
            customer_id: (await orderFounded).customerId,
            total: (await orderFounded).total(),
            items: (await orderFounded).items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id:  orderFounded.id
            }))
        });


    })

    it("should find all orders in database", async () => {
        const customerRepository = new CustomerRepository();
        let customer = new Customer("1", "Bruno Mann");
        let address = new Address("Rua Numero 0", 1, "123", "Porto Alegre");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        
        let customer2 = new Customer("2", "Alguem");
        let address2 = new Address("Rua Numero 1", 2, "1234", "Porto Alegre");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        let productRepository = new ProductRepository();
        let product = new Product("1", "Curso X", 100);
        let product2 = new Product("2", "Curso XY", 80);
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem("1", "O1", product.price, product.id, 2);
        const orderItem2 = new OrderItem("2", "O2", product2.price, product2.id, 2);

        let orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        const order2 = new Order("2", customer2.id, [orderItem2]);
        await orderRepository.create(order);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order);
        expect(orders).toContainEqual(order2);
    });
});