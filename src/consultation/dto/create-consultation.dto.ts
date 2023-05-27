import { IsBoolean, IsDate, IsNotEmpty } from "class-validator";

export class CreateConsultationDto {
  
  @IsNotEmpty()
  
  channel: string;

  @IsDate()
  date : Date; 


  @IsBoolean()
  acceptee: boolean;

}
