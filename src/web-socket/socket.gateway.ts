import { 
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
     } from "@nestjs/websockets";

import {Server, Socket} from 'socket.io'

@WebSocketGateway({
    cors:{origin:'*'},
})
export class SocketGateway{
    @WebSocketServer()
    server:Server
    @SubscribeMessage('hello')
    handleHello( @MessageBody() data: any, @ConnectedSocket() client:Socket) {
        client.emit('hello', `hello ${data.name}`)
    }
   notifyAll(event:string, payload:any){
    this.server.emit(event, payload)
   }
    notifyUser(userId:number, event:string, payload:any){
      const socketId = this.getSocketById(userId)
      if(socketId) this.server.to(socketId).emit(event, payload)
    }
    private userSocket = new Map<number, string>()
    setUserSocket(userId:number, socketId:string){
        this.userSocket.set(userId, socketId)
    }
    getSocketById(userId:number){
        return this.userSocket.get(userId)
    }
}