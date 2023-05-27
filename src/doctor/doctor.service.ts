import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorEntity } from './entities/doctor.entity';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from './dto/search-query.dto';
import {GenericCrudService} from '../Generics/service/generic-crud.service';


@Injectable()
export class DoctorService {
  private genericcrud: GenericCrudService <DoctorEntity> ;


  constructor(@InjectRepository(DoctorEntity)
   private doctorRepository: Repository<DoctorEntity>,){
          this.genericcrud = new GenericCrudService<DoctorEntity>(this.doctorRepository);
        }
      
  async  create(createDoctorDto: CreateDoctorDto) :Promise<DoctorEntity> {
      return await this.genericcrud.create(createDoctorDto);
       
}

  async findAll() {
    return await this.genericcrud.findAll() ;
  }

  async findOne(id : string) :Promise<DoctorEntity>{
    
    return await this.genericcrud.findOne(id);
}

 
async update(id: string,updateDoctorDto: UpdateDoctorDto): Promise<DoctorEntity> {
   return await  this.genericcrud.update(id,updateDoctorDto);
}
async Softdelete( id: string) {
  return await  this.genericcrud.softDelete(id);
}


  async restore(id : string){
return await  this.genericcrud.restore(id) ;
}
  

/*async countDoctorsByRate(){
  const counts = {} ;
  const rates = Object.values(DoctorRateEnum) ;
  for(let rate of rates){
      counts[rate] = await this.doctorRepository.count({where : {rate: rate}}) ;
  }
  return counts ;
}*/

/*
async getDoctorsByPrice(queryParams : SearchQueryDto):Promise<DoctorEntity[]>{
  const {visitprice}=queryParams;
  const qb = this.doctorRepository.createQueryBuilder("doctors");
qb.where('doctors.visitprice = :visitprice', {visitprice: visitprice })
  if (!qb.getMany()) throw new NotFoundException();
return await qb.getMany();
}
*/
}
