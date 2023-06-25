import { Controller, Get, Query, Session } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartChangeDto } from './models/cart-change.dto';
import { CartModel } from './models/cart.model';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Session() session): Promise<CartModel> {
    console.log(session);
    return this.cartService.getCart(session);
  }

  @Get('add')
  async addToCart(
    @Session() session,
    @Query() getCartDto: CartChangeDto,
  ): Promise<CartModel> {
    const { infoCartAdd, cart } = await this.cartService.addToCart(
      session,
      getCartDto,
    );
    console.log(session);
    session.cart = infoCartAdd;
    // console.log(session);
    return cart;
  }
}
