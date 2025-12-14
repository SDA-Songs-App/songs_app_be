import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
     console.log('Login DTO:', loginDto); // debug
    return this.authService.login(loginDto);
  }

  @Post('me')
  async me(@Req() req: any) {
    return req.user;
  }
  @Get()
  async getUsers(){
    return await this.authService.getUsers()
  }
}
