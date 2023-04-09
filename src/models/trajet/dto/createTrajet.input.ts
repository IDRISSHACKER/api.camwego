import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateTrajetInput {
  @Field(() => String, { description: 'fromCityID ' })
  fromCityID: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'toCityID' })
  toCityID: MongooseSchema.Types.ObjectId;

  @Field(() => Number, { description: 'Price' })
  price: number;

  @Field(() => Date, { description: 'Travel start date' })
  startDate: MongooseSchema.Types.Date;
}
