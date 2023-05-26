import { AutoMap } from '@automapper/classes';
import { Product } from '../products.model';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @AutoMap()
  @ApiProperty()
  all: Product[];

  @AutoMap()
  @ApiProperty()
  total: number;

  @AutoMap()
  @ApiProperty()
  limit: number;

  @AutoMap()
  @ApiProperty()
  page: number;

  @AutoMap()
  @ApiProperty()
  totalpages: number;
}
