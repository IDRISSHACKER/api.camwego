import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Travel } from './entity/travel.entity';
import { CreateTravelInput } from './dto/createTravel.input';
import { UsersService } from '../users/users.service';
import { TrajetService } from '../trajet/trajet.service';
@Injectable()
export class TravelService {
  constructor(
    @InjectModel(Travel.name)
    private readonly travelModel: Model<Travel>,
    private readonly userService: UsersService,
    private readonly trajetService: TrajetService,
  ) {}

  async getTravels() {
    return this.travelModel.find();
  }

  async getTrajetByTravel(trajetID: MongooseSchema.Types.ObjectId) {
    await this.trajetService.findOne(trajetID);
  }

  async getDriverByTravel(driverID: MongooseSchema.Types.ObjectId) {
    await this.trajetService.findOne(driverID);
  }

  async getUserByTravel(userId: MongooseSchema.Types.ObjectId) {
    await this.userService.findOne(userId);
  }

  async setTravel(createTravelInput: CreateTravelInput) {
    return this.travelModel.create(createTravelInput);
  }
}
