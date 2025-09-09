import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "prisma/prisma-service";
import { NotFoundError } from "rxjs";
import { CreateLocalizationDto } from "src/localization/dto/localization-create-dto";
@Injectable()
export class Localization{
    constructor(private prsimaService:PrismaService){}
async create(createDto:CreateLocalizationDto){
    return await this.prsimaService.localizations.create({
        data:{
            ...createDto
        }
    })
}
async findOne(id:number){
    const data = await this.prsimaService.localizations.findUnique({
        where:{Id:id}
    })
    if(!data){
        throw new NotFoundException(`Localizatoin data with ID ${id} not found`)
    }
 return data
}
async findMany(){
 const data = await this.prsimaService.localizations.findMany();
 if(!data){
    throw new NotFoundException('No Data found')
 }
 return data;
}
async update(id:number, createDto:CreateLocalizationDto){
 const localData = await this.prsimaService.localizations.findUnique({
    where:{Id:id}
 });
   if(localData){
await this.prsimaService.localizations.update({
    where:{Id:id},
            data:{
            ...createDto
        }})  
    return localData   
}
}
async delete(id:number){
   const data= await this.prsimaService.localizations.delete({
        where:{Id:id}
    })
if(!data){
    throw new NotFoundException(`Localization Data with ID ${id} is already not found to delete`)
}
return data
}
}
