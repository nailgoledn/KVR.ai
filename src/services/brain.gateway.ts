import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: { origin: '*' },
  })
  export class BrainGateway {
    @WebSocketServer()
    server: Server;
  
    emit(event: string, data: any) {
      this.server.emit(event, data);
    }
  }
