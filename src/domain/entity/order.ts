import OrderItem from "./orderItem";

export default class Order{
    private _id: string = "";
    private _customerId: string;
    private _items:  OrderItem[];
    private _total!: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    validate():boolean{
        if(this._id.length === 0){
            throw new Error("Id is required");
        }

        if(this._customerId.length === 0){
            throw new Error("Customer Id is required");
        }
        
        if(this._items.length === 0){
            throw new Error("Almost one item is required in an Order");
        }

        if(this._items.some(item => item.quantity <= 0)){
            throw new Error('The quantity need to be positive');
        }

        return true;
    }

    addItem(orderItem: OrderItem){
        this._items.push(orderItem);
    }

    get id() {
        return this._id;
    }

    get customerId() {
        return this._customerId;
    }
    
    get items() {
        return this._items;
    }

    changeCustomer(id: string){
        this._customerId = id;
    }

    total():number {
        return this._items.reduce( (total, item) => total + item.totalProduct(), 0);
    }
}