import { Controller, Get, Query, Session } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartChangeDto } from './models/cart-change.dto';
import { CartModel } from './models/cart.model';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Session() session): Promise<CartModel> {
    return this.cartService.getCart(session);
  }

  @Get('add')
  async addToCart(
    @Session() session,
    @Query() getCartDto: CartChangeDto,
  ): Promise<CartModel> {
    const { infoCart, cart } = await this.cartService.addToCart(
      session,
      getCartDto,
    );
    session.cart = infoCart;
    // console.log(session);
    return cart;
  }

  @Get('remove')
  async removeCart(
    @Session() session,
    @Query() getCartDto: CartChangeDto,
  ): Promise<CartModel> {
    const { infoCart, cart } = await this.cartService.removeCart(
      session,
      getCartDto,
    );
    session.cart = infoCart;
    return cart;
  }
}
