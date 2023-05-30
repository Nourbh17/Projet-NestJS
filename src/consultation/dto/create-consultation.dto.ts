import { IsBoolean, IsDate, IsNotEmpty } from "class-validator";

export class CreateConsultationDto {
  
  @IsNotEmpty()
  channel: string;

  @IsNotEmpty()
  date : Date; 

  
  @IsNotEmpty()
  acceptee: boolean;

}
