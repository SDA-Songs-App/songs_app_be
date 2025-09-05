import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "prisma/prisma-service";
import { CreateLocalizationDto } from "src/localization/dto/localization-create-dto";
@Injectable()
export class Localization{
    constructor(private prsimaService:PrismaService){}
async create(createDto:CreateLocalizationDto){}
async findOne(id:number){}
async findMany(){}
async update(id:number){}
async delete(id:number){}

}