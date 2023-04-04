import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './entity/car';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/entity/user.entity';
import { UserTypeService } from '../user_type/userType.service';
import { JwtModule } from '@nestjs/jwt';
import { UserType, UserTypeSchema } from '../user_type/entity/userType.entity';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: UserType.name, schema: UserTypeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [CarResolver, CarService, UsersService, UserTypeService],
})
export class CarModule {}
