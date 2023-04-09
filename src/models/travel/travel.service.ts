import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Travel } from './entity/travel.entity';
import { CreateTravelInput } from './dto/createTravel.input';
import { UsersService } from '../users/users.service';
import { TrajetService } from '../trajet/trajet.service';
import { UserTypeService } from '../user_type/userType.service';
@Injectable()
export class TravelService {
  constructor(
    @InjectModel(Travel.name)
    private readonly travelModel: Model<Travel>,
    private readonly userService: UsersService,
    private readonly trajetService: TrajetService,
    private readonly userTypeService: UserTypeService,
  ) {}

  async findAllByTrajetID(trajetID: MongooseSchema.Types.ObjectId) {
    return this.travelModel.find({
      trajetID: trajetID,
    });
  }

  async resolveUserType(typeID: MongooseSchema.Types.ObjectId) {
    return this.userTypeService.findOne(typeID);
  }

  async getTravels() {
    return this.travelModel.find();
  }

  async getMyTravels(userID: MongooseSchema.Types.ObjectId, isDriver = false) {
    if (isDriver) {
      const travels = await this.travelModel.find();
      const driverTravels = [];
      for (const travel of travels) {
        const trajets = await this.trajetService.findAll(travel.trajetID);
        trajets.forEach((trajet) => {
          if (String(trajet.userId) === String(userID)) {
            if (
              !driverTravels
                .map((t) => String(t._id))
                .includes(String(travel._id))
            ) {
              driverTravels.push(travel);
            }
          }
        });
      }
      return driverTravels;
    } else {
      return this.travelModel.find({ userID: userID });
    }
  }

  async getTrajetByTravel(trajetID: MongooseSchema.Types.ObjectId) {
    return await this.trajetService.findOne(trajetID);
  }

  async getDriverByTravel(driverID: MongooseSchema.Types.ObjectId) {
    return await this.trajetService.findOne(driverID);
  }

  async getUserByTravel(userId: MongooseSchema.Types.ObjectId) {
    return await this.userService.findOne(userId);
  }

  async setTravel(
    userID: MongooseSchema.Types.ObjectId,
    createTravelInput: CreateTravelInput,
  ) {
    return this.travelModel.create({
      userID,
      ...createTravelInput,
    });
  }
}
