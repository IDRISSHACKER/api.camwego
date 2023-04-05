import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Trajet } from './entity/trajet.entity';
import { CreateTrajetInput } from './dto/createTrajet.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class TrajetService {
  constructor(
    @InjectModel(Trajet.name)
    private readonly trajetModel: Model<Trajet>,
    private readonly userService: UsersService,
  ) {}

  async findOne(trajetID: MongooseSchema.Types.ObjectId) {
    this.trajetModel.findOne({ _id: trajetID });
  }

  async findTrajetByUserId(userId: MongooseSchema.Types.ObjectId) {
    return this.userService.findUserByTrajet(userId);
  }

  async getTrajets() {
    return this.trajetModel.find();
  }

  async createTrajet(createTrajetInput: CreateTrajetInput) {
    return this.trajetModel.create(createTrajetInput);
  }
}
