import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessageDto {
  @Field()
  senderName: string;

  @Field({ description: "sender's user id" })
  senderId: string;

  @Field({ description: "recipient's user id" })
  recipientId: string;

  @Field({ description: 'this is for user to user conversation uuid' })
  roomId: string;

  @Field()
  message: string;
}
