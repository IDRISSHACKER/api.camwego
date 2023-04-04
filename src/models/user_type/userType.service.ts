import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UserType } from './entity/userType.entity';
import { CreateUserTypeInput } from './dto/userType.input';

@Injectable()
export class UserTypeService {
  constructor(
    @InjectModel(UserType.name)
    private readonly userTypeModel: Model<UserType>,
  ) {}

  async findOne(id: MongooseSchema.Types.ObjectId): Promise<UserType> {
    return this.userTypeModel.findOne({
      _id: id,
    });
  }
  async addUserType(
    userTypeInput: CreateUserTypeInput,
  ): Promise<Error | UserType> {
    try {
      const userTypeInDb = await this.userTypeModel.find({
        label: userTypeInput.label,
      });

      if (Object.keys(userTypeInDb).length) {
        return new Error("Ce type d'utilisateur existe déjà");
      }

      const userType = new this.userTypeModel(userTypeInput);
      return await userType.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async getUserTypes(): Promise<Array<UserType>> {
    return this.userTypeModel.find();
  }
}
