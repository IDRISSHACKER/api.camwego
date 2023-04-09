import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Trajet } from './entity/trajet.entity';
import { TrajetService } from './trajet.service';
import { CreateTrajetInput } from './dto/createTrajet.input';
import { User } from '../users/entity/user.entity';
import { ReqHeaders } from '../../decorator/req-hrader.decorator';
import { myHeaders } from '../../interfaces/headers.interface';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/authGuard';

@Resolver(() => Trajet)
export class TrajetResolver {
  constructor(
    private readonly trajetService: TrajetService,
    private readonly jwtService: JwtService,
  ) {}

  @ResolveField('user', () => User)
  async user(@Parent() trajet: Trajet) {
    return await this.trajetService.findTrajetByUserId(trajet.userId);
  }

  @ResolveField('from', () => User)
  async from(@Parent() trajet: Trajet) {
    return await this.trajetService.resolveTrajetFromCity(trajet.fromCityID);
  }

  @ResolveField('to', () => User)
  async to(@Parent() trajet: Trajet) {
    return await this.trajetService.resolveTrajetFromCity(trajet.toCityID);
  }

  @ResolveField('car', () => User)
  async car(@Parent() trajet: Trajet) {
    return await this.trajetService.resolveTrajetFromCar(trajet.carID);
  }

  @Query(() => [Trajet])
  getTrajets() {
    return this.trajetService.getTrajets();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Trajet])
  getMyTrajets(@ReqHeaders() headers: myHeaders) {
    const user: User = this.jwtService.verify(
      headers.authorization?.split(' ')[1],
    ).user;
    return this.trajetService.getMyTrajets(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Trajet)
  async createTrajet(
    @Args('createTrajetInput') createTrajetInput: CreateTrajetInput,
    @ReqHeaders() headers: myHeaders,
  ) {
    const user: User = this.jwtService.verify(
      headers.authorization?.split(' ')[1],
    ).user;
    return await this.trajetService.createTrajet(user._id, createTrajetInput);
  }
}
