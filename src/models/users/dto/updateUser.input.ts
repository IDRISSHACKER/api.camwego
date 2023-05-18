import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'Firstname', nullable: true })
  firstname?: string;

  @Field(() => String, { description: 'Lastname', nullable: true })
  lastname?: string;

  @Field(() => String, { description: 'User phone', nullable: true })
  phone?: string;

  @Field(() => String, { description: 'Avatar', nullable: true })
  avatar?: string;

  @Field(() => String, { description: 'User password', nullable: true })
  password?: string;

  @Field(() => String, { description: 'User type', nullable: true })
  typeId?: MongooseSchema.Types.ObjectId;
}
