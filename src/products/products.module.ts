import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './models/products.model';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './models/category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.getModelName, schema: Product.modelFromClass.schema },
      {
        name: Category.getModelName,
        schema: Category.getModelFromClass.schema,
      },
    ]),
  ],
  controllers: [ProductsController, CategoryController],
  providers: [ProductsService, CategoryService],
  exports: [ProductsService],
})
export class ProductsModule {}
