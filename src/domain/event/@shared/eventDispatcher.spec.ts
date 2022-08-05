import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer/customerCreatedEvent";
import SendConsoleLogAfterCustomerChangeAddress from "../customer/handler/sendConsoleLogAfterCustomerChangeAddress";
import SendConsoleLogAfterCustomerCreated from "../customer/handler/sendConsoleLogAfterCustomerCreated";
import SendOtherConsoleLogAfterCustomerCreated from "../customer/handler/sendOtherConsoleLogAfterCustomerCreated";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/sendEmailWhenProductIsCreatedHandler";
import ProductCreatedEvent from "../product/productCreatedEvent";
import EventDispatcher from "./eventDispatcher";

describe("Domain event test unit", () => {
    
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();  
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();  
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBe(undefined);
    });

    it("should notify all events registreds", () => {
        const eventDispatcher = new EventDispatcher();  
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        const productCreatedEvent = new ProductCreatedEvent({name: "Creatina", description: "Teste", price: 10});
        eventDispatcher.notify(productCreatedEvent);

        expect(spyHandler).toHaveBeenCalled();

    });

    it("should notify when customer is created", () => {
        const eventDispatcher = new EventDispatcher();  
        const handlerCustomer = new SendConsoleLogAfterCustomerCreated();
        const handler2Customer = new SendOtherConsoleLogAfterCustomerCreated();
        const spyHandler = jest.spyOn(handlerCustomer, "handle");
        const spyHandler2 = jest.spyOn(handler2Customer, "handle");

        eventDispatcher.register("CustomerCreatedEvent", handlerCustomer);
        eventDispatcher.register("CustomerCreatedEvent", handler2Customer);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(handlerCustomer);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(handler2Customer);

        const customerCreatedEvent = new CustomerCreatedEvent(new Date(), {name: "Bruno", lastName: "Ramos"});
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyHandler).toHaveBeenCalled();
        expect(spyHandler2).toHaveBeenCalled();
    });

    it("shoud notify when customer change address", () => {
        const eventDispatcher = new EventDispatcher();
        const changeAddressHandler = new SendConsoleLogAfterCustomerChangeAddress();
        const spyHandler = jest.spyOn(changeAddressHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", changeAddressHandler);

        const customer = new Customer("1", "Bruno");
        customer.changeAddress(new Address("Rua numero 0", 123, "1234", "Porto Alegre"));
        
        let customerCreatedEvent = new CustomerCreatedEvent(new Date(), {id: customer.id, name: customer.name, address: customer.address.street});
        eventDispatcher.notify(customerCreatedEvent)

        expect(spyHandler).toHaveBeenCalled();

        customer.changeAddress(new Address("Rua numero 1", 123, "1234", "Porto Alegre"));
        customerCreatedEvent = new CustomerCreatedEvent(new Date(), {id: customer.id, name: customer.name, address: customer.address.street});
        eventDispatcher.notify(customerCreatedEvent)
    });
});
