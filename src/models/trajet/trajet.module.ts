import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrajetResolver } from './trajet.resolver';
import { TrajetService } from './trajet.service';
import { Trajet, TrajetSchema } from './entity/trajet.entity';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/entity/user.entity';
import { UserType, UserTypeSchema } from '../user_type/entity/userType.entity';
import { Car, CarSchema } from '../car/entity/car';
import { JwtModule } from '@nestjs/jwt';
import { CarService } from '../car/car.service';
import { UserTypeService } from '../user_type/userType.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trajet.name, schema: TrajetSchema },
      { name: User.name, schema: UserSchema },
      { name: UserType.name, schema: UserTypeSchema },
      { name: Car.name, schema: CarSchema },
    ]),
    JwtModule,
  ],
  providers: [
    TrajetResolver,
    UserTypeService,
    TrajetService,
    UsersService,
    CarService,
  ],
})
export class TrajetModule {}
