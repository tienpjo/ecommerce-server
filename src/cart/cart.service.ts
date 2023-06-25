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
  ): Promise<{ infoCartAdd; cart }> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cart, config } = session;
    const { id } = cartDto;
    console.log(id);
    const infoCartAdd: Cart = new Cart(cart || {});
    try {
      const product = await this.findById(id);
      infoCartAdd.add(product, id);
      return { infoCartAdd, cart: solveCart(infoCartAdd) };
    } catch {
      return { infoCartAdd, cart: solveCart(infoCartAdd) };
    }
  }
}
