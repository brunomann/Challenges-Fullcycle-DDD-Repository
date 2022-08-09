import Product from "../entity/product";

export default class ProductService
{
    static increasePrice(products: Product[], percent: number): void
    {
        products.forEach(product =>{
            product.changePrice( product.price + ( ( product.price /100) * percent)  );
        })
    }
}