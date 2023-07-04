import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateCarInput {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'Brand of car', nullable: true })
  brand?: string;

  @Field(() => String, { description: 'Car model', nullable: true })
  model?: string;

  @Field(() => String, { description: 'Car year', nullable: true })
  year?: string;

  @Field(() => String, { description: 'Car color', nullable: true })
  color?: string;

  @Field(() => String, {
    description: 'Car registration number',
    nullable: true,
  })
  registrationNumber: string;

  @Field(() => Number, { description: 'Places', nullable: true })
  nbPace: MongooseSchema.Types.Number;

  @Field(() => String, { description: 'User id', nullable: true })
  userId: MongooseSchema.Types.ObjectId;
}
