import { Body, Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('get-rooms')
  async getAllRooms(@Body('userIds') userIds: string[]): Promise<Room> {
    try {
      return this.roomService.getRoomId(userIds);
    } catch (err) {
      return err.message;
    }
  }
}
