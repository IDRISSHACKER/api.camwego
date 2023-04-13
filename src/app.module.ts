import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import env from './common/constants/settings';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { UsersModule } from './models/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTypeModule } from './models/user_type/userType.module';
import { CarModule } from './models/car/car.module';
import { RouteModule } from './models/trajet/route.module';
import { TravelModule } from './models/travel/travel.module';
import { CityModule } from './models/city/city.module';
import { MessageModule } from './models/message/message.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: !env.PROD,
      playground: !env.PROD,
      autoSchemaFile: join(process.cwd(), 'src/providers/graphql/schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRoot(env.PROD ? env.DB : env.DB_TEST, {}),
    UsersModule,
    UserTypeModule,
    CarModule,
    RouteModule,
    TravelModule,
    CityModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
