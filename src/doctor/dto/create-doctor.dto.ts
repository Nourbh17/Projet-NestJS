import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsStrongPassword, IsNumber, Length} from 'class-validator';

import { notEmpty ,length  } from 'src/Generics/error-messages' ; 

export class CreateDoctorDto {
  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(3,10, { message: (validationData) => length(validationData) })
  firstname: string;

  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(3,10, { message: (validationData) => length(validationData) })
  lastname: string;
  

  
  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(8,20, { message: (validationData) => length(validationData) })
  @IsStrongPassword()
  password: string;


  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Type(() => Number )
  @IsNumber()
  visitprice: number;


  
}
