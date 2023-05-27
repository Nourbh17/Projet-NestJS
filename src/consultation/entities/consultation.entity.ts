import {  PatientEntity } from '../../patient/entities/patient.entity';
import {  DoctorEntity } from '../../doctor/entities/doctor.entity';
import { Column,Entity,ManyToOne,PrimaryGeneratedColumn,} from 'typeorm';
import { TimestampEntity } from 'src/Generics/timestamp.entity';

@Entity('Consultation')
export class ConsultationEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: String; 
  
  @Column()
  channel : String

  @Column()
  date: Date;

  @Column()
  acceptee: boolean;

  @ManyToOne((type) => DoctorEntity, (doctor) => doctor.consultations)
  doctor: DoctorEntity;

  @ManyToOne((type) => PatientEntity, (patient) => patient.consultations)
  patient: PatientEntity;
}
