import { InjectMapper } from '@automapper/nestjs';
import { AutoMapper } from '@nartc/automapper';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { User } from 'src/user/models/user.model';

@Injectable()
export abstract class BaseService<T> {
  constructor() {}
  protected _model: ModelType<T>;
  //protected _mapper: AutoMapper;
  private fullNameConverter(source: User): string {
    return source.firstName + ' ' + source.lastName;
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
    return this._model.findById(id).exec();
  }

  async delete(id: string): Promise<any> {
    //return this._model.findByIdAndRemove(Types.ObjectId(id)).exec();
  }
}
