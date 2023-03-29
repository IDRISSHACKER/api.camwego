import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { myHeaders } from './users.resolver';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async getUsers() {
    try {
      const users = await this.userModel.find();

      if (!users) {
        return new Error('Not user found');
      }
      return users;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async me(id: string, headers: myHeaders) {
    console.log(headers.authorization);
    try {
      const userResult = await this.userModel.find({
        _id: id,
      });
      if (!Object.keys(userResult).length) {
        return new Error('Numero de téléphone ou mot de passe incorect');
      }
      return userResult;
    } catch (error) {
      return new Error(error.message);
    }
  }
  async login(username: string, password: string) {
    try {
      const userResult = await this.userModel.find({
        phone: username,
        password: password,
      });

      if (Object.keys(userResult).length) {
        const payload = { user: userResult };
        return {
          token: this.jwtService.sign(payload),
          user: userResult,
        };
      } else {
        return new Error('Username or password wrong');
      }
    } catch (error) {
      return new Error(error.message);
    }
  }
  async createUser(createUserInput: CreateUserInput) {
    try {
      const userInDb = await this.userModel.find({
        phone: createUserInput.phone,
      });
      if (
        !createUserInput.password.length ||
        !createUserInput.phone.length ||
        !createUserInput.firstname ||
        !createUserInput.lastname
      ) {
        return new Error('All fieds are required');
      }
      if (Object.keys(userInDb).length) {
        return new Error('This user already exist!');
      }
      if (createUserInput.password.length < 4) {
        return new Error(
          'Password is short, complete in 4 characteres or more',
        );
      }
      const user = new this.userModel(createUserInput);
      return user.save({
        timestamps: true,
      });
    } catch (error) {
      return new Error(error.message);
    }
  }
  async dropUser(userId: string) {
    try {
      return this.userModel.findOneAndDelete({
        _id: userId,
      });
    } catch (error) {
      return new Error(error.message);
    }
  }
  async dropAllUser() {
    try {
      return this.userModel.deleteMany({});
    } catch (error) {
      return new Error(error.message);
    }
  }
}
