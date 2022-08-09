import EventInterface from "../../@shared/event/eventInterface";

export default class CustomerCreatedEvent implements EventInterface
{
    dateOccured: Date;
    eventData: any;

    constructor(date: Date, eventData: any){
        this.dateOccured = date;
        this.eventData = eventData;
    }
}