import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/products.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.getModelName) private productModel: ModelType<Product>,
  ) {}
}
