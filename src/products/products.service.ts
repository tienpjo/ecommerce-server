import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/products.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GetProductsDto } from './models/dto/get-products.dto';
import { ProductDto } from './models/dto/products.dto';
import { paginationLimit } from 'src/shared/constans';
import { BaseService } from './../shared/base.service';
import { SortOptions } from './models/sort.enum';
@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectModel(Product.getModelName) private productModel: ModelType<Product>,
  ) {
    super();
    this._model = productModel;
  }
  private sortType = (sortParams): string => {
    switch (sortParams) {
      case SortOptions.NEWEST:
        return `-createdAt`;
      case SortOptions.OLDEST:
        return `createdAt`;
      default:
        return `-createdAt`;
    }
  };
  async getProducts(getProductsDto: GetProductsDto): Promise<ProductDto> {
    const { page, sort, category, search, maxPrice } = getProductsDto;
    const searchQuery = search ? { title: new RegExp(search, 'i') } : {};

    const categoryQuery = category
      ? { [`category`]: new RegExp(category, 'i') }
      : {};
    //TODO: fix maxprice
    const maxPriceQuery = maxPrice ? { maxPrice } : {};

    const query = { ...searchQuery, ...categoryQuery, ...maxPriceQuery };
    const options = {
      limit: paginationLimit,
      page: parseFloat(page),
      sort: this.sortType(sort),
      price: 'salePrice',
    };

    const productsSorted = await this.sortPaginate(query, options);
    return {
      ...productsSorted,
    };
  }

  async getProductByName(name: string): Promise<Product> {
    const exist = await this.findOne({ titleUrl: name });
    if (!exist) {
      throw new NotFoundException(`Product name ${name} not found`);
    }
    return exist;
  }

  async getProductSearch(pSearch: string): Promise<string[]> {
    const productSearch = await this.findAll({
      title: new RegExp(pSearch, 'i'),
    });
    console.log('logg');
    return productSearch;
  }

  async addProduct(productReq: Product): Promise<void> {
    const productExist = await this.findOne({ title: productReq.title });
    if (productExist) {
      throw new ConflictException('Product already exist');
    }
    const newProduct = {
      ...productReq,
      ...{ createdAt: new Date(Date.now()) },
    };
    // console.log(newProduct);

    try {
      const product = await this.createDocument(newProduct);
      return product.toJSON();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
