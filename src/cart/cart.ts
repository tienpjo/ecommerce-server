import { Product } from 'src/products/models/products.model';
import { CartModel } from './models/cart.model';
export class Cart {
  items: Product[];
  constructor(cart: CartModel) {
    this.items = cart.items || [];
  }

  add = (item: Product, id: string): void => {
    this.items.map(p => console.log(p.id));
    const itemExist = !!this.items.filter(cartItem => cartItem.id === id)
      .length;
    console.log(itemExist);
    if (!itemExist) {
      console.log('not exit');
      this.items.push({ ...item, qty: 1, id });
      console.log(this.items.length);
    } else {
      console.log('exit');
      this.items.forEach(cartItem => {
        if (cartItem.id === id) {
          cartItem.qty++;
          console.log(cartItem.qty);
        }
      });
    }
  };
}
