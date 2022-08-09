import Order from "../entity/order";
import OrderService from "./orderService";
import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/orderItem";

describe("Order Service unit test", () => {

    it("should create an order",() => {

        const customer = new Customer("1", "Bruno");
        const orderItem = new OrderItem("1", "Iogurte", 10, "2", 2);

        const order = OrderService.placeOrder(customer, [orderItem]);

        expect(customer.rewardPoints).toBe(10);
        expect(order.total()).toBe(20);
    });

    it("should get total of all orders", () => {

        const orderIem1 = new OrderItem("1", "Item1", 10, "12", 1);
        const orderIem2 = new OrderItem("2", "Item2", 20, "13", 3);
        const orderIem3 = new OrderItem("3", "Item3", 30, "14", 2);

        const order = new Order("1", "2",[orderIem1, orderIem2]);
        const order2 = new Order("2", "3",[orderIem3]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(130);
    });

})