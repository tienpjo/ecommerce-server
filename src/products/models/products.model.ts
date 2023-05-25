import { AutoMap } from '@automapper/classes';
import { getModelForClass, prop, types } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Model } from 'mongoose';
import { BaseModule, schemaOptions } from 'src/shared/base.model';

export class Product extends BaseModule<Product> {
  @prop()
  @AutoMap()
  title: string;

  @prop()
  @AutoMap()
  description: string;

  @prop()
  @AutoMap()
  descriptionFull: string;

  @prop()
  @AutoMap()
  tags: string[];

  @prop()
  @AutoMap()
  regularPrice: number;

  @prop()
  @AutoMap()
  salePrice: number;

  @prop()
  @AutoMap()
  onSale: boolean;

  @prop()
  @AutoMap()
  stock: string;

  @prop()
  @AutoMap()
  visibility: boolean;

  @prop()
  @AutoMap()
  shipping?: string;

  @prop()
  @AutoMap()
  mainImage: { url: string; name: string };
  @prop()
  @AutoMap()
  images: string[];

  static get modelFromClass(): ModelType<Product> {
    return getModelForClass(Product, { schemaOptions });
  }

  static creatModel(): Product {
    return new this.modelFromClass();
  }

  static get getModelName(): string {
    return this.modelFromClass.modelName;
  }
}
