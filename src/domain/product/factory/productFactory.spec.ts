import ProductFactory from "./productFactory";

describe("Product facotry unit test", () => {

    it("should create a product type a", () => { 
        let product = ProductFactory.create("a", "Leite", 6.99);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Leite");
        expect(product.price).toBe(6.99);
        expect(product.constructor.name).toBe("Product");
    });

    it("should create a product type b", () => { 
        let product = ProductFactory.create("b", "Leite de Soja", 9.50);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Leite de Soja");
        expect(product.price).toBe(19);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw a error when product type is not defined", () => { 

        expect(()=>{ProductFactory.create("c", "Leite desnatado", 6.50)}).toThrowError("Type of product is not supported");
    });

});