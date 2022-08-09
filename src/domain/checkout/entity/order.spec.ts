
import Order from "./order";
import OrderItem from "./orderItem";
describe("Order unit test", () => {

    it("should throw a error when id is empty", () => {

        expect(() => {

            let order = new Order("", "123", []);

        }).toThrowError("Id is required");

    });

    it("should throw a error when customerId is empty", () => {

        expect(() => {

            let order = new Order("1", "", []);

        }).toThrowError("Customer Id is required");

    });

    it("should throw a error when item is changePrice", () => {

        expect(() => {

            let order = new Order("1", "123", []);

        }).toThrowError("Almost one item is required in an Order");

    });

    it("should calculate total", () => {

        const item1 = new OrderItem('it1', 'Item 1', 120, 'p1', 2);
        const item2 = new OrderItem('it2', 'Item 2', 30, 'p2', 2);

        const order = new Order('o1', 'cus1', [item1, item2]);

        expect(order.total()).toBe(300);

    });

    it("should check if qte is positive", () => {

        
        expect(()=>{
            const item1 = new OrderItem('it1', 'Item 1', 120, 'p1', 0);
        }).toThrow('The quantity need to be positive');

    });

});