import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorEntity } from './entities/doctor.entity';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorRateEnum } from 'src/Enums/doctor-rate.enum';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class DoctorService {

  constructor(@InjectRepository(DoctorEntity)
        private doctorRepository : Repository<DoctorEntity> ){}


  async  create(createDoctorDto: CreateDoctorDto) :Promise<DoctorEntity> {
        return await this.doctorRepository.save(createDoctorDto);
}

  findAll() {
    return this.doctorRepository.find() ;
  }

  async findOne(id : string) :Promise<DoctorEntity>{
    const doctor=await this.doctorRepository.findOne({where: {id}});
    if (!doctor){
       throw new NotFoundException(`id : ${id} does not exist` );
    }
    return doctor;
}

 
async update(id: string,updateDoctorDto: UpdateDoctorDto): Promise<DoctorEntity> {
    const  newDoctor = await this.doctorRepository.preload({id,...updateDoctorDto,});
    if (newDoctor) {
      return this.doctorRepository.save(newDoctor);
    } else {
      throw new NotFoundException('Doctor does not exist ');
    }
}
async Softdelete( id: string) {
  const res = await this.doctorRepository.softDelete(id);
  if (res){
      return { message: 'Doctor deleted' };
  }
  else {
      throw new NotFoundException(`id ${id} does not exist` );
  }
}


restore(id : string){
return this.doctorRepository.restore(id) ;
}
  

async countDoctorsByRate(){
  const counts = {} ;
  const rates = Object.values(DoctorRateEnum) ;
  for(let rate of rates){
      counts[rate] = await this.doctorRepository.count({where : {rate: rate}}) ;
  }
  return counts ;
}


async getDoctorsByRateOrByPrice(queryParams : SearchQueryDto):Promise<DoctorEntity[]>{
  const {rate,visitprice}=queryParams;
  const qb = this.doctorRepository.createQueryBuilder("doctors");
qb.where(new Brackets(q=> {
  q.where('doctors.rate LIKE :rate', { rate: `%${rate}%` });
})).orWhere('doctors.visitprice = :visitprice', {visitprice: visitprice })
  if (!qb.getMany()) throw new NotFoundException();
return await qb.getMany();
}

}
