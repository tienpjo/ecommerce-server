import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/base.service';
import { Category } from './models/category.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { Product } from './models/products.model';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectModel(Category.getModelName)
    private categoryModel: ModelType<Category>,
    @InjectModel(Product.getModelName)
    private productModel: ReturnModelType<typeof Product>,
  ) {
    super();
    this._model = categoryModel;
  }

  async getAllCategory() {
    const categories = await this._model.find({});
    const product = await this.productModel.find({}).lean().exec();
    return this.solveCategory(categories, product);
  }

  async getCategory() {
    const categories = await this._model.find({ visibility: true });
    return categories;
  }

  // async editCategory(Req): Promise<void> {
  //   const { titleUrl } = Req;
  //   const found = await ;
  // }

  private solveCategory = (categories, products) => {
    console.log(products);
    return categories.map(category => {
      const productCategory = products
        .filter(product => {
          return !!product.category.includes(category.titleUrl);
        })
        .map(product => product.titleUrl);
      console.log(productCategory);
      //.map(product => product.titleUrl);
      return { category, productCategory };
    });
  };
}
