import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsStrongPassword, IsEnum, Length, IsDate} from 'class-validator';
import { RoleEnum } from 'src/Enums/role.enum';

import { notEmpty ,length  } from 'src/Generics/error-messages' ; 
import { SpecialityEntity } from 'src/speciality/entities/speciality.entity';
import { ManyToOne } from 'typeorm';

export class UserSubscribeDto {
  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(3,10, { message: (validationData) => length(validationData) })
  firstname: string;

  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(3,10, { message: (validationData) => length(validationData) })
  lastname: string;
  

  
  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  birthdate: Date;

  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(8,20, { message: (validationData) => length(validationData) })
  @IsStrongPassword()
  password: string;

  @IsEnum(RoleEnum)
  role:RoleEnum;


  @Optional()
  @ManyToOne(
    type => SpecialityEntity,
    (speciality)=> speciality.doctors ,
  
   )
   speciality :SpecialityEntity ;
  
 
}