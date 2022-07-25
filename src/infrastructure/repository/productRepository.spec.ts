import { Sequelize } from "sequelize-typescript"
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/productModel";
import ProductRepository from "./productRepository";

describe("Product repository test unit", () => {

    let sequelize: Sequelize; 

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
            sync: { force: true },
          });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should be create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Creatina 300g", 159);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Creatina 300g",
            price: 159
        });
    });

    it("should be update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Creatina 150g", 80);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Creatina 150g",
            price: 80
        });

        product.changeName("Creatina Integralmedica 150g");
        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Creatina Integralmedica 150g",
            price: 80
        });
    });

    it("should find a product by id", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Gorro", 79);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1"}});

        const foundedProduct = productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: (await foundedProduct).id,
            name: (await foundedProduct).name,
            price: (await foundedProduct).price,
        });
    });

    it("should find all products", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Gorro", 79);
        await productRepository.create(product);

        const product2 = new Product("2", "Luva", 29);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product, product2];

        expect(products).toEqual(foundProducts);
    });
});