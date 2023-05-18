import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Root,
  Subscription,
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
import { PubSub } from 'graphql-subscriptions';

const subscriptionNames = {
  messageAdded: 'messageSended',
};

type SouscriptionVarTypes = {
  receiverID: string;
};

type SouscriptionPayloadType = {
  messageSended?: Message;
  userID: string;
};

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
  ) {}

  @Subscription(() => Message, {
    name: subscriptionNames.messageAdded,
    filter: async (
      payload: SouscriptionPayloadType,
      variables: SouscriptionVarTypes,
    ): Promise<boolean> => {
      const receiverID = String(variables.receiverID);
      const receiverIDPayload = String(payload.messageSended.receiverID);

      return receiverID === receiverIDPayload || receiverID === payload.userID;
    },
  })
  subscribeToMessageSended(
    @Args('receiverID') receiverID: string,
    @Context() ctx: any,
  ) {
    return pubSub.asyncIterator(subscriptionNames.messageAdded);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @ReqHeaders() headers: myHeaders,
  ) {
    const user: User = this.jwtService.verify(
      headers.authorization?.split(' ')[1],
    ).user;

    const newMessage = await this.messageService.createMessage(
      user._id,
      createMessageInput,
    );

    await pubSub.publish(subscriptionNames.messageAdded, {
      messageSended: newMessage,
      userID: String(user._id),
    });

    return newMessage;
  }

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
}
