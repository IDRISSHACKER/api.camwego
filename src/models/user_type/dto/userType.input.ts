import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateUserTypeInput {
  @Field(() => String, { description: 'label' })
  label: string;
}
