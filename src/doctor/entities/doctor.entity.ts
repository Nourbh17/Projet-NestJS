import { DoctorRateEnum } from "src/Enums/doctor-rate.enum";
import { TimestampEntity } from "src/Generics/timestamp.entity";
import { SpecialityEntity } from "src/speciality/entities/speciality.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctor')
export class DoctorEntity extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
  id: string ;
  @Column()
  firstname :string;


  @Column()
  lastname: string ;

  @Column({ unique:true})
  email: string ;

  @Column({ unique:true})
  password: string ;

  @Column()
  visitprice: number ;

  @Column({
    type : "enum",
    enum: DoctorRateEnum,
    default : DoctorRateEnum.first
    
   })
   rate: DoctorRateEnum =DoctorRateEnum.first;
    
   @ManyToOne(
    type => SpecialityEntity,
    (speciality)=> speciality.doctors ,
  
   )
   speciality :SpecialityEntity ;

  
}
