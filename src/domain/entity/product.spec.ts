
import Product from "./product";
describe("Product unit test", () => {

    it("should throw a error when item is empty", () => {

        expect(() => {

            const product = new Product("", "Product 1", 150);

        }).toThrowError("Id is required");

    });

    it("should throw a error when name is empty", () => {

        expect(() => {

            const product = new Product("123", "", 150);

        }).toThrowError("Name is required");

    });

    it("should throw a error when price is negative", () => {

        expect(() => {

            const product = new Product("123", "Produto 1", -1);

        }).toThrowError("Price can't are negative");

    });

    it("should change Name", () => {

        const product = new Product("123", "Produto 1", 100);
        product.changeName("Product 2");
            
        expect((product.name)).toBe("Product 2");

    });

    
    it("should change price", () => {

        const product = new Product("123", "Produto 1", 200);
        product.changePrice(200);
            
        expect((product.price)).toBe(200);

    });
});