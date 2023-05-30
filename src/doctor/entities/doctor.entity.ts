import { RoleEnum } from 'src/Enums/role.enum';
import { TimestampEntity } from 'src/Generics/timestamp.entity';
import { ConsultationEntity } from 'src/consultation/entities/consultation.entity';
import { SpecialityEntity } from 'src/speciality/entities/speciality.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('doctor')
export class DoctorEntity extends UserEntity {
  @ManyToOne((type) => SpecialityEntity, (speciality) => speciality.doctors)
  speciality: SpecialityEntity;

  @Column()
  visitprice: number;
}
