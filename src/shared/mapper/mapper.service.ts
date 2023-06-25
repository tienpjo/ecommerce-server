/* istanbul ignore file */
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { UserDto } from 'src/user/models/standard-models/user.dto';

@Injectable()
export class AutomapProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return mapper => {
      createMap(
        mapper,
        User,
        UserDto,
        forMember(
          d => d.firstName,
          mapFrom(s => s.firstName),
        ),
        forMember(
          d => d.lastName,
          mapFrom(s => s.lastName),
        ),
        forMember(
          d => d.fullName,
          mapFrom(s => s.lastName + ' ' + s.firstName),
        ),
        forMember(
          d => d.role,
          mapFrom(s => s.role),
        ),
      );
    };
  }
}
