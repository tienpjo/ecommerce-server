import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { PaginateOptions } from 'src/products/models/products.model';

@Injectable()
export abstract class BaseService<T> {
  protected _model: ModelType<T>;
  private get modelName(): string {
    return this._model.modelName;
  }

  private get viewModelName(): string {
    return `${this._model.modelName}Vm`;
  }
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
    return this._model
      .findOne({
        _id: this.toObjectId(id),
      })
      .lean()
      .exec();
  }

  async update(args = {}): Promise<any> {
    this._model.findOneAndUpdate(args, { upsert: true });
  }

  async delete(id: string): Promise<any> {
    return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
  }
  private toObjectId(id: string): Types.ObjectId {
    return new mongoose.Types.ObjectId(id);
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

    return Promise.all([all, totalDocs, maxPrice, minPrice]).then(values => {
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
