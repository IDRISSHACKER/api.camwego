import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCityInput {
  @Field(() => String, { description: 'Name of city' })
  label: string;

  @Field(() => String, { description: 'Latitude', nullable: true })
  latitude?: string;

  @Field(() => String, { description: 'Longitude', nullable: true })
  longitude?: string;
}
