import EventInterface from "./eventInterface";

export default interface EventHandlerInterface<T  extends EventInterface=EventInterface>{
    handle(event: T): void;
}