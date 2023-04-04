import { Field, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
@InputType()
export class CreateTrajetInput {
  @Field(() => String, { description: 'From' })
  from: string;

  @Field(() => String, { description: 'To' })
  to: string;

  @Field(() => Int, { description: 'Price' })
  price: number;

  @Field(() => MongooseSchema.Types.ObjectId, { description: 'userId' })
  userId: MongooseSchema.Types.ObjectId;
}
