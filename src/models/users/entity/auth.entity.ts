import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class AuthPayload {
  @Field(() => String, { description: 'token' })
  token: string;

  @Field(() => [User], { description: 'user' })
  user: User;
}
