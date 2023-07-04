import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Message } from './entity/message.entity';
import { CreateMessageInput } from './dto/createMessage.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    private readonly userService: UsersService,
  ) {}

  async findUserByMessage(userID: MongooseSchema.Types.ObjectId) {
    return await this.userService.findOne(userID);
  }

  async createMessage(
    userID: MongooseSchema.Types.ObjectId,
    createMessageInput: CreateMessageInput,
  ) {
    return await this.messageModel.create({
      userID: userID,
      ...createMessageInput,
    });
  }

  async findOne(messageID: MongooseSchema.Types.ObjectId) {
    return this.messageModel.findOne({
      _id: messageID,
    });
  }

  async findMyMessages(myID: MongooseSchema.Types.ObjectId) {
    try {
      const messages = await this.messageModel.find({
        $or: [{ receiverID: myID }, { userID: myID }],
      });

      if (!messages) {
        return new Error('Not message found');
      }
      return [...messages];
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findMessages() {
    try {
      const messages = await this.messageModel.find();

      if (!messages) {
        return new Error('Not message found');
      }
      return messages;
    } catch (error) {
      return new Error(error.message);
    }
  }
}
