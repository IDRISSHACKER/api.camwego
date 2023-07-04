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
  brand?: string;

  @Prop()
  @Field(() => String, { description: 'Car model', nullable: true })
  model?: string;

  @Prop()
  @Field(() => String, { description: 'Car year', nullable: true })
  year?: string;

  @Prop()
  @Field(() => String, { description: 'Car color', nullable: true })
  color?: string;

  @Prop()
  @Field(() => String, {
    description: 'Car registration number',
    nullable: true,
  })
  registrationNumber: string;

  @Prop()
  @Field(() => Number, { description: 'Places', nullable: true })
  nbPace: MongooseSchema.Types.Number;

  @Prop()
  @Field(() => String, { description: 'User id', nullable: true })
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => User, { description: 'User', nullable: true })
  user?: User;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);
CarSchema.set('timestamps', true);
