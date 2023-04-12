import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../users/entity/user.entity';
import { Travel } from './entity/travel.entity';
import { TravelService } from './travel.service';
import { CreateTravelInput } from './dto/createTravel.input';
import { Trajet } from '../trajet/entity/trajet.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/authGuard';
import { ReqHeaders } from '../../decorator/req-hrader.decorator';
import { myHeaders } from '../../interfaces/headers.interface';
import { JwtService } from '@nestjs/jwt';
import mongoose, { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Travel)
export class TravelResolver {
  constructor(
    private readonly travelService: TravelService,
    private readonly jwtService: JwtService,
  ) {}

  @ResolveField('user', () => User)
  async user(@Parent() travel: Travel) {
    return await this.travelService.getUserByTravel(travel.userID);
  }
  @ResolveField('trajet', () => Trajet)
  async trajet(@Parent() travel: Travel) {
    return await this.travelService.getTrajetByTravel(travel.trajetID);
  }

  @Query(() => [Travel])
  async getTravels() {
    return await this.travelService.getTravels();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Travel])
  async getMyTravels(@ReqHeaders() headers: myHeaders) {
    const user: User = this.jwtService.verify(
      headers.authorization?.split(' ')[1],
    ).user;

    console.log(user);

    const userType = await this.travelService.resolveUserType(user.typeId);

    console.log(userType);

    if (userType.label === 'driver') {
      return await this.travelService.getMyTravels(user._id, true);
    }
    return await this.travelService.getMyTravels(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Travel)
  createTravel(
    @Args('createTravelInput') createTravelInput: CreateTravelInput,
    @ReqHeaders() headers: myHeaders,
  ) {
    const user: User = this.jwtService.verify(
      headers.authorization?.split(' ')[1],
    ).user;
    return this.travelService.setTravel(user._id, createTravelInput);
  }

  @Mutation(() => Travel)
  confirmTravel(@Args('travelID') travelID: string) {
    return this.travelService.confirmTravel(
      travelID as unknown as MongooseSchema.Types.ObjectId,
    );
  }
}
