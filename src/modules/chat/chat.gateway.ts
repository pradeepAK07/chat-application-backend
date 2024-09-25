// src/chat/chat.gateway.ts
import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send.message.dto';

@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  private chatUsers: Map<string, string> = new Map();

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(this.chatUsers);

    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.chatUsers.set(client.id, userId);
      console.log(this.chatUsers);
      client.broadcast.emit('user-joined', {
        message: `${userId} joined the chat!`,
      });
      console.log(`User ${userId} connected with socket ID: ${client.id}`);
    } else {
      client.disconnect();
      console.log('Connection rejected: User ID not provided');
    }
  }

  handleDisconnect(client: Socket) {
    console.log(this.chatUsers);
    const userId = this.chatUsers.get(client.id);
    if (userId) {
      this.server.emit('user-left', {
        message: `${userId}User left the chat`,
      });
      console.log(`User ${userId} disconnected`);
      this.chatUsers.delete(client.id);
    }
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() sendMessageDto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('new msg', sendMessageDto);
    this.chatService.sendMessage(sendMessageDto);
    const connectedUserId = this.chatUsers.get(client.id);
    if (connectedUserId !== sendMessageDto.senderId) {
      console.error('Sender ID does not match the connected user');
      return;
    }
    // Find the recipient's socket ID
    const recipientSocketId = Array.from(this.chatUsers.keys()).find(
      (socketId) => this.chatUsers.get(socketId) === sendMessageDto.recipientId,
    );
    if (recipientSocketId) {
      // Send the message to the recipient
      this.server.to(recipientSocketId).emit('receiveMessage', sendMessageDto);
    } else {
      console.error('Recipient not found or not connected');
    }
    // Send the message to the sender's socket as well
    client.emit('receiveMessage', sendMessageDto);
  }
}
