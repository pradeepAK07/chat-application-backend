import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomRepository } from './room.repository';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
})
export class RoomModule {}
