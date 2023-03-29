import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entity/user.entity';
import { UseGuards, Headers } from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/authGuard';
import { AuthPayload } from './entity/auth.entity';
import { ReqHeaders } from '../../decorator/req-hrader.decorator';

export interface myHeaders extends Headers {
  authorization: string;
}

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => [User])
  getUsers() {
    return this.usersService.getUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async me(@Args('id') id: string, @ReqHeaders() headers: myHeaders) {
    return this.usersService.me(id, headers);
  }

  @Mutation(() => AuthPayload)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return await this.usersService.login(username, password);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async dropUser(@Args('userId') userId: string) {
    return await this.usersService.dropUser(userId);
  }
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }
}
