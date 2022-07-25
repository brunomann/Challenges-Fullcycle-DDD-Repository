export default class Address{
    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";

    constructor(_street: string, _number: number, _zip: string, _city: string) {
        this._street = _street;
        this._number = _number;
        this._zip = _zip;
        this._city = _city;

        this.validate();
    }

    get street() {return this._street}
    get number() {return this._number}
    get zip() {return this._zip}
    get city() {return this._city}

    validate() {
        if (this._street.length === 0){
            throw new Error("The street is a mandatory field");
        }
        if (this._number === 0){
            throw new Error("The number is a mandatory field");
        }
        if (this._zip.length === 0){
            throw new Error("The zip is a mandatory field");
        }
        if (this._city.length === 0){
            throw new Error("The city is a mandatory field");
        }
    }
}