import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entity/user.entity';

@Schema()
@ObjectType('Message')
export class Message {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  userID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  receiverID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  content: string;

  @Prop()
  @Field(() => Boolean, { defaultValue: false })
  readed: boolean;

  @Field(() => User)
  user: User;

  @Field(() => User)
  receiver: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
