import { Product } from 'src/products/models/products.model';
import { CartModel } from './models/cart.model';
export class Cart {
  items: Product[];
  constructor(cart: CartModel) {
    this.items = cart.items || [];
  }

  add = (item: Product, id: string): void => {
    const itemExist = !!this.items.filter(cartItem => cartItem.id === id)
      .length;
    console.log(this.items);
    console.log(itemExist);
    console.log(item);
    if (!itemExist) {
      // console.log('not exit');
      this.items.push({ ...item, qty: 1, id });
      console.log(this.items.length);
    } else {
      //   console.log('exit');
      this.items.forEach(cartItem => {
        if (cartItem.id === id) {
          cartItem.qty++;
          console.log(cartItem.qty);
        }
      });
    }
  };

  remove = (id: string): void => {
    this.items = this.items
      .map(item => {
        if (item.id === id && item.qty > 1) {
          item.qty--;
        } else if (item.id === id && item.qty === 1) {
          item = {} as Product;
        }
        return item;
      })
      .filter(cartItem => cartItem.id);
  };

  check = (id: string) => {
    return this.items.find(item => item.id === id);
  };
}
