import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { notEmpty,length } from "src/Generics/error-messages";

export class CreateSpecialityDto {

@IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(3,10, { message: (validationData) => length(validationData) })
  name: string;

  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(5,50, { message: (validationData) => length(validationData) })
  description: string;
    
}
