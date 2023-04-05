import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateTravelInput {
  @Field(() => String, { description: 'TrajetID' })
  trajetID: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'UserID' })
  userID: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'DriverID' })
  driverID: MongooseSchema.Types.ObjectId;

  @Field(() => Boolean, { description: 'Accepted' })
  accepted: boolean;
}
