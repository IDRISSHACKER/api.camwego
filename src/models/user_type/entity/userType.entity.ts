import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType('UserType')
export class UserType {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'label', nullable: true })
  label: string;
}

export const UserTypeSchema = SchemaFactory.createForClass(UserType);
