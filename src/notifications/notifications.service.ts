import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma-service';

@Injectable()
export class NotificationsService {
    constructor(private prisma:PrismaService){}
    async getNotifications(){
         const notification = await this.prisma.notifications.findMany({
            orderBy:{createdAt:'desc'}
        });
        console.log("notification", notification)
        return notification;
    }
}
