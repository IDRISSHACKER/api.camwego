import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Firstname' })
  firstname: string;

  @Field(() => String, { description: 'Lastname' })
  lastname: string;

  @Field(() => String, { description: 'User phone' })
  phone: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}
