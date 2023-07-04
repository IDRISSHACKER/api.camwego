import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entity/user.entity';

@Schema()
@ObjectType('Message', {})
export class Message {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { nullable: true })
  userID?: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { nullable: true })
  receiverID?: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { nullable: true })
  content?: string;

  @Prop()
  @Field(() => Boolean, { defaultValue: false })
  readed: boolean;

  @Field(() => User)
  user: User;

  @Field(() => User)
  receiver: User;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.set('timestamps', true);
