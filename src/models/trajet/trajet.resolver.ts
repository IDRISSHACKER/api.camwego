import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Trajet } from './entity/trajet.entity';
import { TrajetService } from './trajet.service';
import { CreateTrajetInput } from './dto/createTrajet.input';
import { User } from '../users/entity/user.entity';

@Resolver(() => Trajet)
export class TrajetResolver {
  constructor(private readonly trajetService: TrajetService) {}

  @ResolveField('user', () => User)
  async userType(@Parent() trajet: Trajet) {
    return await this.trajetService.findTrajetByUserId(trajet.userId);
  }

  //@ResolveField('nbPlaceOccupied', () => Number)
  //async nbPlaceOccupied(@Parent() trajet: Trajet) {
  //return await this.trajetService.requestNBPlaceOccupied(trajet._id);
  //}

  @Query(() => [Trajet])
  getTrajets() {
    return this.trajetService.getTrajets();
  }

  @Mutation(() => Trajet)
  async createTrajet(@Args('createTrajetInput') createTrajetInput: CreateTrajetInput) {
    return await this.trajetService.createTrajet(createTrajetInput);
  }
}
