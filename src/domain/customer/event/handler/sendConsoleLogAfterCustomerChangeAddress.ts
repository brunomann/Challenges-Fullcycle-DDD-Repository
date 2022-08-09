import EventHandlerInterface from "../../../@shared/event/eventHandlerInterface";
import CustomerCreatedEvent from "../customerCreatedEvent";

export default class SendConsoleLogAfterCustomerChangeAddress implements EventHandlerInterface<CustomerCreatedEvent>
{
    handle(event: CustomerCreatedEvent): void
    {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`);
    }
}