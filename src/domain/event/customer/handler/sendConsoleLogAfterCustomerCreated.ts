import EventHandlerInterface from "../../@shared/eventHandlerInterface";
import CustomerCreatedEvent from "../customerCreatedEvent";

export default class SendConsoleLogAfterCustomerCreated implements EventHandlerInterface<CustomerCreatedEvent>
{
    handle(event: CustomerCreatedEvent): void
    {
        console.log('Esse é o primeiro console.log do evento: CustomerCreated');
    }
}