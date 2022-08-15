import { v4 as uuid } from "uuid";
import OrderFactory from "./orderFactory";

describe("Order factory unit test", ()=>{

    it("should create a new order using a factory", ()=>{
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product 1",
                    productId: uuid(),
                    quantity: 1,
                    price: 100
                },
            ],
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items.length).toBe(1);
    })

});
