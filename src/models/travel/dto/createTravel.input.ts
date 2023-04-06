import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateTravelInput {
  @Field(() => String, { description: 'UserID' })
  userID: MongooseSchema.Types.ObjectId;

  @Field(() => Number, { description: 'number of user' })
  nbPlace: MongooseSchema.Types.Number;
}
