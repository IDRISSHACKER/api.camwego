import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/entity/user.entity';
import { UserType, UserTypeSchema } from '../user_type/entity/userType.entity';
import { Car, CarSchema } from '../car/entity/car';
import { JwtModule } from '@nestjs/jwt';
import { CarService } from '../car/car.service';
import { UserTypeService } from '../user_type/userType.service';
import { Trajet, TrajetSchema } from '../trajet/entity/trajet.entity';
import { TrajetService } from '../trajet/trajet.service';
import { City, CitySchema } from '../city/entity/city.entity';
import { CityService } from '../city/city.service';
import { Message, MessageSchema } from './entity/message.entity';
import { MessageService } from './message.service';
import { TravelService } from '../travel/travel.service';
import { Travel, TravelSchema } from '../travel/entity/travel.entity';
import { MessageResolver } from './message.resolver';
import env from '../../common/constants/settings';

@Module({
  imports: [
    JwtModule.register({
      secret: env.KEY,
    }),
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Travel.name, schema: TravelSchema },
      { name: Trajet.name, schema: TrajetSchema },
      { name: User.name, schema: UserSchema },
      { name: UserType.name, schema: UserTypeSchema },
      { name: Car.name, schema: CarSchema },
      { name: City.name, schema: CitySchema },
    ]),
  ],
  providers: [
    MessageService,
    MessageResolver,
    TravelService,
    UserTypeService,
    TrajetService,
    UsersService,
    CarService,
    CityService,
  ],
})
export class MessageModule {}
