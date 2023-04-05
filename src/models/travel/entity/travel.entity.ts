import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entity/user.entity';
import { Trajet } from '../../trajet/entity/trajet.entity';

@Schema()
@ObjectType('Travel')
export class Travel {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Brand of car', nullable: true })
  brand: string;

  @Prop()
  @Field(() => String, { description: 'TrajetID' })
  trajetID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'UserID' })
  userID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'DriverID' })
  driverID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => Boolean, { description: 'Accepted' })
  accepted: boolean;

  @Field(() => User, { description: 'User', nullable: true })
  user: User;

  @Field(() => Trajet, { description: 'Travel', nullable: true })
  trajet: Trajet;

  @Field(() => User, {
    description: 'Driver (Instance of user)',
    nullable: true,
  })
  driver: User;
}

export const TravelSchema = SchemaFactory.createForClass(Travel);
