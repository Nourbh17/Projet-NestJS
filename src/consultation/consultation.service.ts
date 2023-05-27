import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {GenericCrudService} from '../Generics/service/generic-crud.service';
import { ConsultationEntity } from './entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';


@Injectable()
export class ConsultationService {
  private genericcrud: GenericCrudService <ConsultationEntity> ;


  constructor(@InjectRepository(ConsultationEntity)
   private consultationRepository: Repository<ConsultationEntity>,){
          this.genericcrud = new GenericCrudService<ConsultationEntity>(this.consultationRepository);
        }
      
  async  create(createConsultationDto: CreateConsultationDto) :Promise<ConsultationEntity> {
      return await this.genericcrud.create(createConsultationDto);
       
}

  async findAll() {
    return await this.genericcrud.findAll() ;
  }

  async findOne(id : string) :Promise<ConsultationEntity>{
    
    return await this.genericcrud.findOne(id);
}

 
async update(id: string,updateConsultationDto: UpdateConsultationDto): Promise<ConsultationEntity> {
   return await  this.genericcrud.update(id,updateConsultationDto);
}
async Softdelete( id: string) {
  return await  this.genericcrud.softDelete(id);
}


  async restore(id : string){
return await  this.genericcrud.restore(id) ;
}
  


}