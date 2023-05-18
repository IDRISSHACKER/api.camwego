import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entity/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/authGuard';
import { AuthPayload } from './entity/auth.entity';
import { ReqHeaders } from '../../decorator/req-hrader.decorator';
import { UserType } from '../user_type/entity/userType.entity';
import { myHeaders } from '../../interfaces/headers.interface';
import { UpdateUserInput } from './dto/updateUser.input';
import { JwtService } from '@nestjs/jwt';
import env from '../../common/constants/settings';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @ResolveField('userType', () => UserType)
  async userType(@Parent() user: User) {
    return await this.usersService.findUserTypeByUserId(user.typeId);
  }

  @ResolveField('avatar', () => UserType)
  async avatar(@Parent() user: User) {
    const userInDB = await this.usersService.findOne(user._id);
    return `${env.DRIVER_PATH}/${userInDB.avatar}`;
  }

  @Query(() => [User])
  getUsers(@ReqHeaders() head: myHeaders) {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async me(@Args('id') id: string) {
    return this.usersService.me(id);
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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  handlerModifyUser(
    @ReqHeaders() headers: myHeaders,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const user: User = this.jwtService.verify(
      headers.authorization?.split(' ')[1],
    ).user;
    return this.usersService.modifyUser(user._id, updateUserInput);
  }
}
