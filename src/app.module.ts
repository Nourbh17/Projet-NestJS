import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorModule } from './doctor/doctor.module';
import { ConsultationModule } from './consultation/consultation.module';
import { SpecialityModule } from './speciality/speciality.module';
import { DoctorEntity } from './doctor/entities/doctor.entity';
import { SpecialityEntity } from './speciality/entities/speciality.entity';

@Module({
  imports: [
    DoctorModule,PatientModule,ConsultationModule,SpecialityModule,
    TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'localhost',
      port: 3306 ,
      username: 'root',
      password: '',
      database: 'projet-nest',
     entities: [DoctorEntity,SpecialityEntity],
     synchronize: true
    }
    ),
    DoctorModule,
    ConsultationModule,
    SpecialityModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
