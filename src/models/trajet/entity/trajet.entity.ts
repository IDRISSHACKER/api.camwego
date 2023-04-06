import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entity/user.entity';
import { City } from '../../city/entity/city.entity';

@Schema()
@ObjectType('Trajet')
export class Trajet {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => City, { description: 'City Model' })
  from: City;

  @Field(() => City, { description: 'City Model' })
  to: City;

  @Prop()
  @Field(() => Date, { description: 'Travel start date' })
  startDate: MongooseSchema.Types.Date;

  @Prop()
  @Field(() => String, { description: 'fromCityID ' })
  fromCityID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'toCityID' })
  toCityID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => Int, { description: 'Price' })
  price: number;

  @Prop()
  @Field(() => String, { description: 'userId' })
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => User, { description: 'User (Intance of user)' })
  user: User;

  @Field(() => Number, {
    description: 'Number of seats occupied',
    defaultValue: 0,
  })
  nbPlaceOccupied?: MongooseSchema.Types.Number;
}

export const TrajetSchema = SchemaFactory.createForClass(Trajet);
