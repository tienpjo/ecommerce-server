import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './models/products.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.getModelName, schema: Product.modelFromClass.schema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProductsModule {}
