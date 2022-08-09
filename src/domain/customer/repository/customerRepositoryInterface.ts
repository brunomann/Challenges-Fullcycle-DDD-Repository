import Customer from "../entity/customer";
import RepositoryInterface from "../../@shared/repository/repositoryInterface";

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> { }