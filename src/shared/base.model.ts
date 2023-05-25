import { Module } from '@nestjs/common';
import { prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SchemaOptions } from 'mongoose';
@Module({})
export abstract class BaseModule<T> {
  @ApiPropertyOptional({ type: Date })
  @prop()
  @Expose()
  createdAt?: Date;

  @ApiPropertyOptional({ type: Date })
  @prop()
  @Expose()
  updatedAt?: Date;

  @ApiPropertyOptional()
  @prop()
  @Expose()
  id?: string;
}

export const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
  },
};
