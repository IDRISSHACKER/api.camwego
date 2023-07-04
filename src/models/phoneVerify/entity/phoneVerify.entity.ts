import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType('PhoneVerifyEntity', {})
export class PhoneVerifyEntity {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  phone: string;

  @Prop()
  @Field(() => String)
  code: string;

  @Prop()
  @Field(() => Boolean, { defaultValue: false })
  verified?: boolean;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const PhoneVerifySchema =
  SchemaFactory.createForClass(PhoneVerifyEntity);

PhoneVerifySchema.set('timestamps', true);
