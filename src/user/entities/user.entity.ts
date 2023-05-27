import { RoleEnum } from "src/Enums/role.enum";
import { TimestampEntity } from "src/Generics/timestamp.entity";
import { SpecialityEntity } from "src/speciality/entities/speciality.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity extends TimestampEntity{
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
  salt: string;

  @Column({
    type : "enum",
    enum: RoleEnum,
   })
  role : string;

 

  
}
