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
  @Field(() => String, { description: 'TrajetID' })
  trajetID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'UserID' })
  userID: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => Number, { description: 'number of user' })
  nbPlace: MongooseSchema.Types.Number;

  @Prop()
  @Field(() => Boolean, { description: 'Accepted', defaultValue: false })
  accepted?: boolean;

  @Field(() => User, { description: 'User', nullable: true })
  user: User;

  @Field(() => Trajet, {
    description: 'Travel (Instance of user)',
    nullable: true,
  })
  trajet: Trajet;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const TravelSchema = SchemaFactory.createForClass(Travel);
TravelSchema.set('timestamps', true);
