import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserType, UserTypeSchema } from './entity/userType.entity';
import { UserTypeResolver } from './userType.resolver';
import { UserTypeService } from './userType.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserType.name, schema: UserTypeSchema },
    ]),
  ],
  providers: [UserTypeResolver, UserTypeService],
})
export class UserTypeModule {}
