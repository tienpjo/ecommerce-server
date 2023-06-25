import { getModelForClass, prop } from '@typegoose/typegoose';
import { BaseModel, schemaOptions } from 'src/shared/base.model';
import { UserRole } from './user-role.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AutoMap } from '@automapper/classes';

export class User extends BaseModel<User> {
  @prop({
    required: [true, 'Username is required'],
    unique: true,
    minlength: [6, 'Must be at least 6 characters'],
  })
  @AutoMap()
  username: string;

  @prop({
    required: [true, 'Password is required'],
    unique: true,
    minlength: [6, 'Must be at least 6 characters'],
  })
  @AutoMap()
  password: string;

  @prop()
  @AutoMap()
  firstName?: string;

  @prop()
  @AutoMap()
  lastName?: string;

  @prop({ enum: UserRole, default: UserRole.User })
  @AutoMap()
  role?: UserRole;

  static get modelForClass(): ModelType<User> {
    return getModelForClass(User, { schemaOptions });
  }

  static creatModel(): User {
    return new this.modelForClass();
  }
  static get getModelName(): string {
    return this.modelForClass.modelName;
  }
}
