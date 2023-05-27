import { RoleEnum } from "src/Enums/role.enum";
import { TimestampEntity } from "src/Generics/timestamp.entity";
import { ConsultationEntity } from "src/consultation/entities/consultation.entity";
import { SpecialityEntity } from "src/speciality/entities/speciality.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctor')
export class DoctorEntity extends UserEntity{
   

  @Column()
  visitprice: number ;

  
    
   @ManyToOne(
    type => SpecialityEntity,
    (speciality)=> speciality.doctors ,
  
   )
   speciality :SpecialityEntity ;


   @OneToMany(
    type => ConsultationEntity,
    (consultation)=> consultation.doctor,
    {cascade: true ,
    eager : true , }
   )
   consultations: ConsultationEntity[] ;

  
}
