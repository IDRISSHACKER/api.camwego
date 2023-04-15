import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserType, UserTypeSchema } from '../user_type/entity/userType.entity';
import { UserTypeService } from '../user_type/userType.service';
import { Car, CarSchema } from '../car/entity/car';
import { CarService } from '../car/car.service';
import env from '../../common/constants/settings';

@Module({
  imports: [
    JwtModule.register({
      secret: env.KEY,
      signOptions: { expiresIn: '20h' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserType.name, schema: UserTypeSchema },
      { name: Car.name, schema: CarSchema },
    ]),
  ],
  providers: [UsersResolver, UsersService, UserTypeService, CarService],
})
export class UsersModule {}
