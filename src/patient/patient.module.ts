import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PatientController],
  imports:[
  TypeOrmModule.forFeature([PatientEntity]),
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: process.env.SECRET
   })],
  providers: [PatientService]
})
export class PatientModule {}
