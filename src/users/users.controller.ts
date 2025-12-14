import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login-dto';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}
    @Post()
    createAdmin(
        @Body () body:{
                     firstName:string, 
                     secondName:string, 
                     email:string, 
                     phoneNumber:string ,
                     password:string ,
                     role:'ADMIN' | 'SUPER_ADMIN'}){
            return this.userService.createdAdmin(
                body.firstName, 
                body.secondName, 
                body.phoneNumber,
                body.email, 
                body.password, 
                body.role)
        }
    @Get()
    getAdmins(){
        return this.userService.getAdmins();
    }
    @Patch()
    updateRole(@Param('id') id:string, @Body() body:{role:'ADMIN' | 'SUPER_ADMIN'}){
        return this.userService.updateRole(+id, body.role)
    }
    @Delete()
    deleteAdmin(@Param('id') id:string){
        return ''
    }
    @Post('login')
    async login(@Body() loginDTO: LoginDto){
        return this.userService.login(loginDTO.email, loginDTO.password)
    }
}
