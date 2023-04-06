import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/entity/user.entity';
import { UserType, UserTypeSchema } from '../user_type/entity/userType.entity';
import { Car, CarSchema } from '../car/entity/car';
import { JwtModule } from '@nestjs/jwt';
import { CarService } from '../car/car.service';
import { UserTypeService } from '../user_type/userType.service';
import { TravelResolver } from './travel.resolver';
import { Travel, TravelSchema } from './entity/travel.entity';
import { Trajet, TrajetSchema } from '../trajet/entity/trajet.entity';
import { TrajetService } from '../trajet/trajet.service';
import { TravelService } from './travel.service';
import {City, CitySchema} from "../city/entity/city.entity";
import {CityService} from "../city/city.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Travel.name, schema: TravelSchema },
      { name: Trajet.name, schema: TrajetSchema },
      { name: User.name, schema: UserSchema },
      { name: UserType.name, schema: UserTypeSchema },
      { name: Car.name, schema: CarSchema },
      { name: City.name, schema: CitySchema },
    ]),
    JwtModule,
  ],
  providers: [
    TravelResolver,
    TravelService,
    UserTypeService,
    TrajetService,
    UsersService,
    CarService,
    CityService,
  ],
})
export class TravelModule {}
