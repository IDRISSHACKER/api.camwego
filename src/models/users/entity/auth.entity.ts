import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class AuthPayload {
  @Field(() => String, { description: 'token' })
  token: string;

  @Field(() => [User], { description: 'user' })
  user: User;
}

@ObjectType()
export class CheckPhonePayload {
  @Field(() => String, { description: 'phone' })
  phone: string;

  @Field(() => Boolean, { description: 'is registered' })
  alreadyRegistered: boolean;
}
