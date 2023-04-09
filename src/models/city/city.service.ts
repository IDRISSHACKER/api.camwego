import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Schema as MongooseSchema} from 'mongoose';
import { City } from './entity/city.entity';
import { CreateCityInput } from './dto/createCity.input';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: Model<City>,
  ) {}

  async findOne(cityID: MongooseSchema.Types.ObjectId) {
    return this.cityModel.findOne({ _id: cityID });
  }

  createCity(createCityInput: CreateCityInput) {
    return this.cityModel.create(createCityInput);
  }

  getCities() {
    return this.cityModel.find();
  }
}
