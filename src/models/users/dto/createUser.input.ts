import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Firstname' })
  firstname: string;


  @Field(() => String, { description: 'Lastname' })
  lastname: string;

  @Field(() => String, { description: 'User phone' })
  phone: string;

  @Field(() => String, { description: 'User email', nullable: true })
  email?: string;

  @Field(() => String, { description: 'User password' })
  password: string;

  @Field(() => String, { description: 'User type', nullable: true })
  typeId?: MongooseSchema.Types.ObjectId;

  @Field(() => String, {
    nullable: true,
    description: 'national identity card',
  })
  cni?: string;

  @Field(() => String, {
    nullable: true,
    description: 'user avaar',
  })
  avatar?: string;

  @Field(() => String, { nullable: true, description: 'gray card' })
  grayCard?: string;

  @Field(() => String, { nullable: true, description: 'technical visit' })
  technicalVisit?: string;

  @Field(() => String, { nullable: true, description: 'driversLicense' })
  driversLicense?: string;
}
