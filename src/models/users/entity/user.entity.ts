import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from '../../user_type/entity/userType.entity';

@Schema()
@ObjectType('User')
export class User {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Firstname' })
  firstname: string;

  @Prop()
  @Field(() => String, { description: 'Lastname' })
  lastname: string;

  @Prop()
  @Field(() => String, { description: 'User phone' })
  phone: string;

  @Prop()
  @Field(() => String, { description: 'User email', nullable: true })
  email?: string;

  @Prop()
  @Field(() => String, { description: 'User password' })
  password: string;

  @Prop()
  @Field(() => String, { description: 'User type id', nullable: true })
  typeId?: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, {
    description: 'User Avatar',
    nullable: true,
    defaultValue: 'default-avatar.jpeg',
  })
  avatar?: string;

  @Field(() => UserType, { description: 'User Type', nullable: true })
  userType: UserType;

  @Prop()
  @Field(() => String, {
    nullable: true,
    description: 'national identity card',
  })
  cni?: string;

  @Prop()
  @Field(() => String, { nullable: true, description: 'gray card' })
  grayCard?: string;

  @Prop()
  @Field(() => String, { nullable: true, description: 'technical visit' })
  technicalVisit?: string;

  @Prop()
  @Field(() => String, {
    nullable: true,
    description: 'Verified',
    defaultValue: false,
  })
  verified?: boolean;

  @Prop()
  @Field(() => String, { nullable: true, description: 'driversLicense' })
  driversLicense?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('timestamps', true);
