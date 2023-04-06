import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateCarInput {
  @Field(() => String, { description: 'Brand of car' })
  brand: string;

  @Field(() => Number, { description: 'Places', nullable: true })
  nbPace: MongooseSchema.Types.Number;

  @Field(() => String, { description: 'Registration' })
  registration: string;

  @Field(() => String, { description: 'Gray card' })
  grayCard: string;

  @Field(() => String, { description: 'Technical visit' })
  technicalVisit: string;

  @Field(() => String, { description: 'User id' })
  userId: MongooseSchema.Types.ObjectId;
}
