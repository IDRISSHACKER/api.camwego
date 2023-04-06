import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entity/user.entity';

@Schema()
@ObjectType('Car')
export class Car {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Brand of car', nullable: true })
  brand: string;

  @Prop()
  @Field(() => Number, { description: 'Places', nullable: true })
  nbPace: MongooseSchema.Types.Number;

  @Prop()
  @Field(() => String, { description: 'Registration', nullable: true })
  registration: string;

  @Prop()
  @Field(() => String, { description: 'Gray card', nullable: true })
  grayCard: string;

  @Prop()
  @Field(() => String, { description: 'Technical visit', nullable: true })
  technicalVisit: string;

  @Prop()
  @Field(() => String, { description: 'User id', nullable: true })
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => User, { description: 'User', nullable: true })
  user?: User;
}

export const CarSchema = SchemaFactory.createForClass(Car);
