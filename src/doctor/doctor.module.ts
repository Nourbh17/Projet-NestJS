import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv' ;
import { JwtModule } from '@nestjs/jwt';


dotenv.config()
@Module({
  controllers: [DoctorController],
  imports:[
  TypeOrmModule.forFeature([DoctorEntity]),
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: process.env.SECRET
   })],
  providers: [DoctorService]
})
export class DoctorModule {}
