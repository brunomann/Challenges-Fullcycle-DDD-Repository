import EventHandlerInterface from "./eventHandlerInterface";
import EventInterface from "./eventInterface";

export default interface EventDispatcherInterface{
    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;
}