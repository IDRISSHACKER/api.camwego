import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Trajet } from './entity/trajet.entity';
import { CreateTrajetInput } from './dto/createTrajet.input';
import { UsersService } from '../users/users.service';
import { CityService } from '../city/city.service';
import { CarService } from '../car/car.service';

@Injectable()
export class TrajetService {
  constructor(
    @InjectModel(Trajet.name)
    private readonly trajetModel: Model<Trajet>,
    private readonly userService: UsersService,
    private readonly cityService: CityService,
    private readonly carService: CarService,
  ) {}

  async findOne(trajetID: MongooseSchema.Types.ObjectId) {
    this.trajetModel.findOne({ _id: trajetID });
  }

  async resolveTrajetFromCar(carID: MongooseSchema.Types.ObjectId) {
    return this.carService.findOne(carID);
  }
  async resolveTrajetFromCity(cityID: MongooseSchema.Types.ObjectId) {
    return this.cityService.findOne(cityID);
  }

  async findTrajetByUserId(userId: MongooseSchema.Types.ObjectId) {
    return this.userService.findUserByTrajet(userId);
  }

  async getTrajets() {
    return this.trajetModel.find();
  }

  async getMyTrajets(userID: MongooseSchema.Types.ObjectId) {
    return this.trajetModel.find({
      userId: userID,
    });
  }

  async createTrajet(
    userID: MongooseSchema.Types.ObjectId,
    createTrajetInput: CreateTrajetInput,
  ) {
    const car = await this.carService.findOneBy(userID);
    return this.trajetModel.create({
      ...createTrajetInput,
      userId: userID,
      carID: car._id,
    });
  }
}
