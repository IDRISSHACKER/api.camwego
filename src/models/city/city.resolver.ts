import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { City } from './entity/city.entity';
import { CityService } from './city.service';
import { CreateCityInput } from './dto/createCity.input';

@Resolver(() => City)
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [City])
  getCities() {
    return this.cityService.getCities();
  }

  @Mutation(() => City)
  async createCity(@Args('createCityInput') createCityInput: CreateCityInput) {
    return await this.cityService.createCity(createCityInput);
  }
}
