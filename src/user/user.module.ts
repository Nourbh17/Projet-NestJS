import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv' ;
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DoctorModule } from 'src/doctor/doctor.module';
import { DoctorEntity } from 'src/doctor/entities/doctor.entity';



dotenv.config()
@Module({
  controllers:  [UserController],
  imports:[
  TypeOrmModule.forFeature([UserEntity]),
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: process.env.SECRET
   })],
  providers: [UserService]
})
export class UserModule {}
