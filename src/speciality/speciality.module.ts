import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { SpecialityEntity } from './entities/speciality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SpecialityController],
  imports:[TypeOrmModule.forFeature([SpecialityEntity])],
  providers: [SpecialityService]
})
export class SpecialityModule {}
