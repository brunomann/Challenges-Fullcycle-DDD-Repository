import Address from "../value-object/address";
import CustomerFactory from "./customerFactory";

describe("Customer factory unit tests", () => {

    it("should create a customer", () => {
        let customer = CustomerFactory.create("Bruno");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Bruno");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with address", () => {
        const address = new Address('Teste', 320, '1234', 'Porto Alegre');
        let customer = CustomerFactory.withAddress("Bruno", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Bruno");
        expect(customer.address).toBe(address);
    });

});