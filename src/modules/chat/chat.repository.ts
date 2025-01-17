import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatRepository extends Repository<Chat> {
  constructor(private readonly dataSource: DataSource) {
    super(Chat, dataSource.createEntityManager());
  }
}
