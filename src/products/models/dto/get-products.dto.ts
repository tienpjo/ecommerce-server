import { prop } from '@typegoose/typegoose';
import { SortOptions } from '../sort.enum';

export class GetProductsDto {
  @prop()
  page: string;
  @prop({ enum: SortOptions })
  sort: SortOptions;
  @prop()
  category?: string;
  @prop()
  search?: string;
  @prop()
  maxPrice?: number;
}
