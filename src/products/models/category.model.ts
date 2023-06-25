import { AutoMap } from '@automapper/classes';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseModel, schemaOptions } from 'src/shared/base.model';

export class Category extends BaseModel<Category> {
  @prop()
  @AutoMap()
  titleUrl: string;
  @prop()
  @AutoMap()
  title: string;
  @prop()
  @AutoMap()
  mainImage: { url: string; name: string; type?: boolean };
  @prop()
  @AutoMap()
  subCategory?: string[];
  @prop()
  @AutoMap()
  visibility: boolean;
  @prop()
  @AutoMap()
  menuHidden: boolean;
  @prop()
  @AutoMap()
  description: boolean;

  static get getModelFromClass(): ModelType<Category> {
    return getModelForClass(Category, { schemaOptions });
  }

  static createModel(): Category {
    return new this.getModelFromClass();
  }
  static get getModelName(): string {
    return this.getModelFromClass.modelName;
  }
}
