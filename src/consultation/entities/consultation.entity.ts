import { Column,Entity,ManyToOne,PrimaryGeneratedColumn,} from 'typeorm';
import { TimestampEntity } from 'src/Generics/timestamp.entity';
import { UserEntity } from 'src/user/entities/user.entity';

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

  @ManyToOne((type) => UserEntity, (doctor) => doctor.consultations)
  doctor: UserEntity;

  @ManyToOne((type) => UserEntity, (patient) => patient.consultations)
  patient: UserEntity;
}
