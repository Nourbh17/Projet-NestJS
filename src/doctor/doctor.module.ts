import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';

@Module({
  controllers: [DoctorController],
  imports:[TypeOrmModule.forFeature([DoctorEntity])],
  providers: [DoctorService]
})
export class DoctorModule {}