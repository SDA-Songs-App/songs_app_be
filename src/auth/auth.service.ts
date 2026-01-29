import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email');
    let validPassword = false;
    // Compare hashed password
  if(user.password.startsWith('$2b$') || user.password.startsWith('$2a$')){
     validPassword = await bcrypt.compare(password, user.password);
  }
  else{
      validPassword = password === user.password;
  }
    if (!validPassword) throw new UnauthorizedException('Wrong password');

    // Generate JWT
    const token = await this.jwt.signAsync({
      sub: user.Id,       // make sure your Prisma field is Id
      role: user.role,
      user
    });

    return { token, role: user.role };
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
