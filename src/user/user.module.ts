import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { AutomapperModule } from '@automapper/nestjs';
import { AutomapProfile } from 'src/shared/mapper.service';

@Module({
  imports: [
    AutomapperModule,
    MongooseModule.forFeature([
      {
        name: User.getModelName, // get infomation Mongoose by Typegoose
        schema: User.modelForClass.schema,
      },
    ]),
  ],
  providers: [UserService, AutomapProfile, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
