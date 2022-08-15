import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

interface OrderProps
{
    id: string,
    customerId: string,
    items: 
        {
            id: string,
            name: string,
            productId: string,
            quantity: number,
            price: number,
        }[];
}

export default class OrderFactory
{
    public static create(props: OrderProps): Order
    {
        let items = props.items.map((item) => { return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity); });

        return new Order(props.id, props.customerId, items)
    }
}