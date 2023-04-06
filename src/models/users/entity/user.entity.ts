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
  @Field(() => String, { description: 'User password' })
  password: string;

  @Prop()
  @Field(() => String, { description: 'User type id', nullable: true })
  typeId?: MongooseSchema.Types.ObjectId;

  @Field(() => UserType, { description: 'User Type', nullable: true })
  userType?: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);
