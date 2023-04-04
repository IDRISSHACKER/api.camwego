import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Car } from './entity/car';
import { CarService } from './car.service';
import { CreateCarInput } from './dto/createCar.input';
import { User } from '../users/entity/user.entity';

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @ResolveField('user', () => User)
  async car(@Parent() car: Car) {
    return await this.carService.getUserByCarId(car.userId);
  }

  @Query(() => [Car])
  async getCars() {
    return await this.carService.getCars();
  }

  @Mutation(() => Car)
  createCar(@Args('createCarInput') createCarInput: CreateCarInput) {
    return this.carService.setCar(createCarInput);
  }
}
