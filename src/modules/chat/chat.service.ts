import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { SendMessageDto } from './dto/send.message.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepo: ChatRepository) {}

  async getAllMessages(roomId: string): Promise<Chat[]> {
    return this.chatRepo.find({
      where: { roomId },
      order: { createdAt: 'ASC' },
    });
  }

  async sendMessage(sendMessageData: SendMessageDto): Promise<Chat> {
    const message = this.chatRepo.create(sendMessageData);
    return this.chatRepo.save(message);
  }
}
