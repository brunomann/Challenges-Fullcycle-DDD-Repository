import Customer from "../entity/customer";
import Order from "../entity/order";
import RepositoryInterface from "./repositoryInterface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> { }