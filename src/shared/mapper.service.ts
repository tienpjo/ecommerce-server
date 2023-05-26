/* istanbul ignore file */
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  Converter,
  convertUsing,
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { UserDto } from 'src/user/models/standard-models/user.dto';
import { Product } from 'src/products/models/products.model';
import { ProductDto } from 'src/products/models/dto/products.dto';

@Injectable()
export class AutomapProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserDto,
        forMember(
          (d) => d.firstName,
          mapFrom((s) => s.firstName),
        ),
        forMember(
          (d) => d.lastName,
          mapFrom((s) => s.lastName),
        ),
        forMember(
          (d) => d.fullName,
          mapFrom((s) => s.lastName + ' ' + s.firstName),
        ),
        forMember(
          (d) => d.role,
          mapFrom((s) => s.role),
        ),
      );
    };
  }
}
