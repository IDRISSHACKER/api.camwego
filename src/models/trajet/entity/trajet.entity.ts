import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entity/user.entity';

@Schema()
@ObjectType('Trajet')
export class Trajet {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'From' })
  from: string;

  @Prop()
  @Field(() => String, { description: 'To' })
  to: string;

  @Prop()
  @Field(() => Int, { description: 'Price' })
  price: number;

  @Prop()
  @Field(() => String, { description: 'userId' })
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => User, { description: 'userId' })
  user: User;
}

export const TrajetSchema = SchemaFactory.createForClass(Trajet);
