import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
@InputType()
export class CreateMessageInput {
  @Field(() => String)
  receiverID: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  content: string;
}
