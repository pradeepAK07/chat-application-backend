import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { SendMessageDto } from './dto/send.message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('get-messages')
  async getAllMessages(@Query('roomId') roomId: string): Promise<Chat[]> {
    return this.chatService.getAllMessages(roomId);
  }
}
