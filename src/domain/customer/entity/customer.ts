import Address from "../value-object/address";

export default class Customer{
    
    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;


    constructor(id: string, name: string){
        this._id = id;
        this._name = name;

        this.validate();

        return this;
    }

    get name(){
        return this._name;
    }

    get rewardPoints(){
        return this._rewardPoints;
    }

    get id(){
        return this._id;
    }

    get address(){
        return this._address;
    }

    validate(){
        
        if(this._name.length === 0){
            throw new Error("Name is required");
        }

        if(this._id.length === 0){
            throw new Error("Id is required");
        }
    }

    isActive():boolean{
        return this._active;
    }

    active(){
        if(this._address === undefined){
            throw new Error("The Address is a mandatory parameter");
        }

        this._active = true;
    }

    deactive(){
        this._active = false;
    }

    changeName(name: string){
        this._name = name;
    }

    changeAddress(address: Address){
        this._address = address;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

    set Address(address: Address){
        this._address = address;
    }
}