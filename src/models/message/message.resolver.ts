import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/authGuard';
import { ReqHeaders } from '../../decorator/req-hrader.decorator';
import { myHeaders } from '../../interfaces/headers.interface';
import { JwtService } from '@nestjs/jwt';
import { Message } from './entity/message.entity';
import { MessageService } from './message.service';
import { User } from '../users/entity/user.entity';
import { CreateMessageInput } from './dto/createMessage.input';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
  ) {}

  @ResolveField('user', () => User)
  async user(@Parent() message: Message) {
    return await this.messageService.findUserByMessage(message.userID);
  }

  @ResolveField('receiver', () => User)
  async receiver(@Parent() message: Message) {
    return await this.messageService.findUserByMessage(message.receiverID);
  }

  @Query(() => [Message])
  async getMessages() {
    return await this.messageService.findMessages();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Message])
  async getMyMessages(@ReqHeaders() headers: myHeaders) {
    const user: User = this.jwtService.verify(
      headers.authorization?.split(' ')[1],
    ).user;

    return await this.messageService.findMyMessages(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @ReqHeaders() headers: myHeaders,
  ) {
    const user: User = this.jwtService.verify(
      headers.authorization?.split(' ')[1],
    ).user;
    return this.messageService.createMessage(user._id, createMessageInput);
  }
}
