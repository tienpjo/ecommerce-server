import { InjectMapper } from '@automapper/nestjs';
import { AutoMapper } from '@nartc/automapper';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GetProductsDto } from 'src/products/models/dto/get-products.dto';
import { PaginateOptions, Product } from 'src/products/models/products.model';
import { User } from 'src/user/models/user.model';

@Injectable()
export abstract class BaseService<T> {
  constructor() {}
  protected _model: ModelType<T>;

  async createDocument(payload: T): Promise<any> {
    //console.log({ payload }); // payload:{}
    return this._model.create(payload);
  }
  // TODO: fix type any of Promise return
  async findAll(args = {}): Promise<any> {
    return this._model.find(args).exec();
  }

  async findOne(args = {}): Promise<any> {
    return this._model.findOne(args).exec();
  }

  async findById(id: string): Promise<any> {
    return this._model.findById(id).exec();
  }

  async delete(id: string): Promise<any> {
    //return this._model.findByIdAndRemove(Types.ObjectId(id)).exec();
  }

  async sortPaginate(query = {}, options: PaginateOptions): Promise<any> {
    const sort = options.sort;
    const limit = options.limit ? options.limit : 10;
    const page = options.page || 1;
    //TODO: fix skip
    const skip = options['page'] ? limit : 0;

    const all = limit
      ? this._model.find(query).sort(sort).skip(skip).limit(limit).exec()
      : query;

    const totalDocs = this._model.countDocuments(query).exec();
    const maxPrice = this._model
      .findOne({})
      .sort(`${options.price}`)
      .select(`${options.price}`);
    const minPrice = this._model
      .findOne({})
      .sort(`${options.price}`)
      .select(`${options.price}`);

    return Promise.all([all, totalDocs, maxPrice, minPrice]).then((values) => {
      return Promise.resolve({
        all: values[0],
        pagination: {
          total: values[1],
          limit: limit,
          page: page,
          pages: Math.floor(values[1] / limit) || 1,
        },
        maxPrice: values[2],
        minPrice: values[3],
      });
    });
  }
}
