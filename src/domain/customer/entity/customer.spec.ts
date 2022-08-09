import Address from "../value-object/address";
import Customer from "./customer";
describe("Customer unit test", () => {

    it("should throw a error when id is empty", () => {

        expect(() => {
            let customer = new Customer("", "Bruno");
        }).toThrowError("Id is required");
        
    });

    it("should throw a error when name is empty", () => {

        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
        
    });

    it("should change name", () => {

        // Arrange
        const customer = new Customer("123", "Bruno");

        //Act
        customer.changeName("Bruno Mann");

        // Assert
        expect((customer.name)).toBe("Bruno Mann");
        
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "Bruno");
        const address = new Address("Assis Brasil", 123, "12345678", "Porto Alegre");
        customer.Address = address;
        customer.active();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("123", "Bruno");

        customer.deactive();

        expect(customer.isActive()).toBe(false);
    });

    it("should throw a error when active customer without address", () => {
        // const customer = new Customer("123", "Bruno");
        // expect(() =>{
        //     customer.active()
        // }).toThrowError("The Address is a mandatory parameter");

        expect(()=>{
            const customer = new Customer("123", "Bruno");
            customer.active();
        }).toThrowError("The Address is a mandatory parameter");
    });

    it("should add reward points", () => {

        const customer = new Customer("123","Bruno");
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(125);
        expect(customer.rewardPoints).toBe(125);
        
        customer.addRewardPoints(5);
        expect(customer.rewardPoints).toBe(130);
    });
});