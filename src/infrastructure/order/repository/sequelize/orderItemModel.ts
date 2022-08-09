import { Column, Model, PrimaryKey, ForeignKey, Table, BelongsTo } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customerModel";
import OrderModel from "./orderModel";
import ProductModel from "../../../product/repository/sequelize/productModel";

@Table({
    tableName: "order_item",
    timestamps: false
})
export default class OrderItemModel extends Model 
{
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(()  => ProductModel)
    @Column({allowNull: false})
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;
    
    @ForeignKey(()  => OrderModel)
    @Column({allowNull: false})
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({allowNull: false})
    declare name: string;
   
    @Column({allowNull: false})
    declare quantity: number;
   
    @Column({allowNull: false})
    declare price: number;
}