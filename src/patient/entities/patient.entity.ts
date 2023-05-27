import { UserEntity } from 'src/user/entities/user.entity';
import { ConsultationEntity } from '../../consultation/entities/consultation.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('patient')
export class PatientEntity extends UserEntity {
 
  @OneToMany(
    (type) => ConsultationEntity,
    (consultations) => consultations.patient,
    { cascade: true, eager: true },
  )
  consultations: ConsultationEntity[];
}