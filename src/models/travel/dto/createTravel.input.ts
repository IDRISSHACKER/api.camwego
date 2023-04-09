import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreateTravelInput {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'TrajetID' })
  trajetID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => Number, { description: 'number of user' })
  nbPlace: MongooseSchema.Types.Number;
}
