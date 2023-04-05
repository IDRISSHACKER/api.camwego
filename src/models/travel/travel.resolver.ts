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

@Resolver(() => Travel)
export class TravelResolver {
  constructor(private readonly travelService: TravelService) {}

  @ResolveField('user', () => User)
  async user(@Parent() travel: Travel) {
    return await this.travelService.getUserByTravel(travel.userID);
  }
  @ResolveField('trajet', () => Trajet)
  async trajet(@Parent() travel: Travel) {
    return await this.travelService.getTrajetByTravel(travel.trajetID);
  }

  @ResolveField('driver', () => User)
  async driver(@Parent() travel: Travel) {
    return await this.travelService.getDriverByTravel(travel.driverID);
  }

  @Query(() => [Travel])
  async getTravels() {
    return await this.travelService.getTravels();
  }

  @Mutation(() => Travel)
  createTravel(
    @Args('createTravelInput') createTravelInput: CreateTravelInput,
  ) {
    return this.travelService.setTravel(createTravelInput);
  }
}
