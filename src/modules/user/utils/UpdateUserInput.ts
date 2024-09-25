import { Field, InputType, PartialType } from '@nestjs/graphql';
import { createUserInput } from './createUserInput';

@InputType()
export class UpdateUserInput extends PartialType(createUserInput) {
  @Field({ description: 'unique id' })
  id: string;
}
