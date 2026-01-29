import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { first } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}
    async createdAdmin(firstName:string, secondName:string, email:string, phoneNumber:string ,password:string ,role:'ADMIN' | 'SUPER_ADMIN'){
        const hashedPassword = await bcrypt.hash(password, 10)
        return this.prisma.user.create({
            data:{
                firstName:firstName, 
                LastName:secondName,
                userName:firstName + secondName, 
                email:email, 
                phone:phoneNumber,
                password:hashedPassword, 
                role
            }
        })
    }
    async getAdmins(){
        return this.prisma.user.findMany({
            where:{
                role:{in:['ADMIN', 'SUPER_ADMIN']}
            }, 
            select:{
                Id:true, 
                userName:true, 
                email:true, 
                role:true, 
                createdAt:true
            }
        })
    }
    async findEmail(email:string){
        return this.prisma.user.findUnique({where:{email}})
    }
    async updateRole(userId:number, role:'ADMIN' | 'SUPER_ADMIN'){
        return this.prisma.user.update({
            where:{Id:userId}, 
            data:{role}
        })
    }
    async login(email:string, password:string){
      const user = await this.findEmail(email);
      if(!user){
        throw new Error('invalid email or password')
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch){
        throw new Error('Invalid email or password')
      }
      return {id:user.Id, name:user.userName, role:user.role}
    }

}
