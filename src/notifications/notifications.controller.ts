import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private notification:NotificationsService){}
    @Get()
    async getNotifications(){
        return await this.notification.getNotifications();
    }
}
