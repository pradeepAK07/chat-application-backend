import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatGateway, ChatService, ChatRepository],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
