import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { ArrayContains, In } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepo: RoomRepository) {}
  async getRoomId(userIds: string[]): Promise<Room> {
    const rooms = await this.roomRepo.findOne({
      where: {
        userIds: ArrayContains(userIds),
        isGroup: false,
      },
    });
    if (!rooms) {
      const result = this.roomRepo.create({
        userIds,
        isGroup: false,
        isPrivate: true,
      });
      return this.roomRepo.save(result);
    }
    return rooms;
  }
  async getRooms(userId: string, isGroup: boolean, isPrivate: boolean) {
    const userIds = Array.isArray(userId) ? userId : [userId];
    const rooms = await this.roomRepo.find({
      where: {
        userIds: In(userIds),
        isGroup,
        isPrivate,
      },
    });
    return rooms;
  }
}
