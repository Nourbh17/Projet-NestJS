import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {GenericCrudService} from '../Generics/service/generic-crud.service';
import { PatientEntity } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';


@Injectable()
export class PatientService {
  private genericcrud: GenericCrudService <PatientEntity> ;


  constructor(@InjectRepository(PatientEntity)
   private patientRepository: Repository<PatientEntity>,){
          this.genericcrud = new GenericCrudService<PatientEntity>(this.patientRepository);
        }
      
  async  create(createPatientDto: CreatePatientDto) :Promise<PatientEntity> {
      return await this.genericcrud.create(createPatientDto);
       
}

  async findAll() {
    return await this.genericcrud.findAll() ;
  }

  async findOne(id : string) :Promise<PatientEntity>{
    
    return await this.genericcrud.findOne(id);
}

 
async update(id: string,updatePatientDto: UpdatePatientDto): Promise<PatientEntity> {
   return await  this.genericcrud.update(id,updatePatientDto);
}
async Softdelete( id: string) {
  return await  this.genericcrud.softDelete(id);
}


  async restore(id : string){
return await  this.genericcrud.restore(id) ;
}
  


}
