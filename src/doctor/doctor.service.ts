import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorEntity } from './entities/doctor.entity';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from './dto/search-query.dto';
import {GenericCrudService} from '../Generics/service/generic-crud.service';
import { SpecialityEntity } from 'src/speciality/entities/speciality.entity';
import { UserEntity } from 'src/user/entities/user.entity';


@Injectable()
export class DoctorService extends GenericCrudService<DoctorEntity>{
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(SpecialityEntity)
      private specialityRepository: Repository<SpecialityEntity>,
  ) { super(doctorRepository);}

  create(newdoctor : CreateDoctorDto): Promise<DoctorEntity> {
    return this.doctorRepository.save(newdoctor);
  }


   

  
}


