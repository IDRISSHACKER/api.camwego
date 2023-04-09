import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Car } from './entity/car';
import { CreateCarInput } from './dto/createCar.input';
import { UsersService } from '../users/users.service';
@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car.name)
    private readonly CarModel: Model<Car>,
    private readonly userService: UsersService,
  ) {}

  async findOne(carID: MongooseSchema.Types.ObjectId) {
    return this.CarModel.findOne({ _id: carID });
  }
  async findOneBy(userID: MongooseSchema.Types.ObjectId) {
    return this.CarModel.findOne({ userId: userID });
  }
  async getUserByCarId(userId: MongooseSchema.Types.ObjectId) {
    return this.userService.findUserByCar(userId);
  }

  async getCars() {
    return this.CarModel.find();
  }

  async setCar(createCarInput: CreateCarInput) {
    return this.CarModel.create(createCarInput);
  }
}
