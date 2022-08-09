import EventHandlerInterface from "../../../@shared/event/eventHandlerInterface";
import CustomerCreatedEvent from "../customerCreatedEvent";

export default class SendOtherConsoleLogAfterCustomerCreated implements EventHandlerInterface<CustomerCreatedEvent>
{
    handle(event: CustomerCreatedEvent): void
    {
        console.log('Esse é o segundo console.log do evento: CustomerCreated');
    }
}