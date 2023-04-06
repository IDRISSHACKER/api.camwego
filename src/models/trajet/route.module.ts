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
import { TravelService } from '../travel/travel.service';
import { Travel, TravelSchema } from '../travel/entity/travel.entity';
import { CityService } from '../city/city.service';
import { City, CitySchema } from '../city/entity/city.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trajet.name, schema: TrajetSchema },
      { name: Travel.name, schema: TravelSchema },
      { name: User.name, schema: UserSchema },
      { name: UserType.name, schema: UserTypeSchema },
      { name: Car.name, schema: CarSchema },
      { name: City.name, schema: CitySchema },
    ]),
    JwtModule,
  ],
  providers: [
    TrajetResolver,
    TrajetService,
    TravelService,
    UsersService,
    UserTypeService,
    CarService,
    CityService,
  ],
})
export class RouteModule {}
