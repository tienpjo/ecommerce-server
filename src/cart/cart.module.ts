import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from 'src/products/models/products.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.getModelName, schema: Product.modelFromClass.schema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
