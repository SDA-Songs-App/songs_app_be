import { 
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection, 
    OnGatewayDisconnect } from "@nestjs/websockets";
import {Server} from 'socket.io'

@WebSocketGateway({
    cors:{origin:'*'},
})
export class SocketGateway implements 
OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server:Server
    handleConnection(client: any, ...args: any[]) {
        console.log("Client connected", client.id);
    }
    handleDisconnect(client: any) {
        console.log('client disconnected', client.id);
    }
    broadcastDataupdated(data:any){
        this.server.emit('Lyrics updated', data)
    }
    
}