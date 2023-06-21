import { prop } from '@typegoose/typegoose';

export class CartChangeDto {
  @prop()
  id: string;
}
