import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';
import { City, CitySchema } from './entity/city.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [CityResolver, CityService],
})
export class CityModule {}
