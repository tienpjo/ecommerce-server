import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Product } from 'src/products/models/products.model';
import { CartChangeDto } from './models/cart-change.dto';
import { Cart } from './cart';
import { CartModel } from './models/cart.model';
import { solveCart } from 'src/shared/utils';
import { BaseService } from 'src/shared/base.service';

@Injectable()
export class CartService extends BaseService<Product> {
  constructor(
    @InjectModel(Product.getModelName)
    private productModel: ModelType<Product>,
  ) {
    super();
    this._model = productModel;
  }

  async getCart(session): Promise<CartModel> {
    const { cart } = session;
    const saveCart = cart || new Cart({ items: [] });
    return solveCart(saveCart);
  }

  async addToCart(
    session,
    cartDto: CartChangeDto,
  ): Promise<{ infoCart; cart }> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cart, config } = session;

    const { id } = cartDto;
    const infoCart: Cart = new Cart(cart || {});
    try {
      const product = await this.findById(id);
      infoCart.add(product, id);
      return { infoCart, cart: solveCart(infoCart) };
    } catch {
      return { infoCart, cart: solveCart(infoCart) };
    }
  }

  async removeCart(
    session,
    cartDto: CartChangeDto,
  ): Promise<{ infoCart; cart }> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cart, config } = session;
    const { id } = cartDto;
    const infoCart: Cart = new Cart(cart || { items: [] });
    try {
      const product = await this.findById(id);
      if (!product) {
        const ExistCart = infoCart.check(id);
        if (ExistCart) {
          const emptyCart = new Cart({ items: [] });
          return { infoCart: emptyCart, cart: emptyCart };
        }
      }
      infoCart.remove(id);
      return { infoCart, cart: solveCart(infoCart) };
    } catch {
      return { infoCart, cart: solveCart(infoCart) };
    }
  }
}
