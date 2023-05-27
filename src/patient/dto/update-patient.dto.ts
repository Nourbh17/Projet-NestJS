import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsStrongPassword, IsNumber, Length, IsIn, IsOptional, IsEnum } from 'class-validator';
import { notEmpty ,length  } from 'src/Generics/error-messages' ; 
import { CreatePatientDto } from './create-patient.dto';


export class UpdatePatientDto extends PartialType(CreatePatientDto) {


  @IsOptional()
  @Length(3,10, { message: (validationData) => length(validationData) })
  firstname: string;

  @IsOptional()
  @Length(3,10, { message: (validationData) => length(validationData) })
  lastname: string;
  

  
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(8,20, { message: (validationData) => length(validationData) })
  @IsStrongPassword()
  password: string;


 

  

}
 


