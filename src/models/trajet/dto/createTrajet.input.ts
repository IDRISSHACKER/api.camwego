import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
@InputType()
export class CreateTrajetInput {
  @Field(() => String, { description: 'From' })
  from: string;

  @Field(() => String, { description: 'To' })
  to: string;

  @Field(() => Number, { description: 'Price' })
  price: number;

  @Field(() => String, { description: 'userId' })
  userId: MongooseSchema.Types.ObjectId;
}
