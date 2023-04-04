import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserTypeService } from './userType.service';
import { UserType } from './entity/userType.entity';
import { CreateUserTypeInput } from './dto/userType.input';
@Resolver(() => UserType)
export class UserTypeResolver {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Mutation(() => UserType)
  async addUserType(
    @Args('createUserTypeInput') createUserTypeInput: CreateUserTypeInput,
  ) {
    return await this.userTypeService.addUserType(createUserTypeInput);
  }

  @Query(() => [UserType])
  async getUserTypes() {
    return this.userTypeService.getUserTypes();
  }
}
