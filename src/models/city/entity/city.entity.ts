import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType('City')
export class City {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Name of city' })
  label: string;

  @Prop()
  @Field(() => String, { description: 'Latitude', nullable: true })
  latitude?: string;

  @Prop()
  @Field(() => String, { description: 'Longitude', nullable: true })
  longitude?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
CitySchema.set('timestamps', true);
