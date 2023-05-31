import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from '../Generics/service/generic-crud.service';
import { ConsultationEntity } from './entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@Injectable()
export class ConsultationService extends GenericCrudService<ConsultationEntity> {
  constructor(
    @InjectRepository(ConsultationEntity)
    private consultationRepository: Repository<ConsultationEntity>,
  ) {
    super(consultationRepository);
  }

  async create(
    createConsultationDto: CreateConsultationDto,
  ): Promise<ConsultationEntity> {
    return await this.consultationRepository.save(createConsultationDto);
  }

  async accept(id : string,accept : UpdateConsultationDto) {
    const con = await this.findOne(id);
    if(!con){
      throw new NotFoundException(" can't find id ")
    }
    con.acceptee = 1 ;
    con.date = accept.date;
    const q = this.consultationRepository.save(con);
    if ( !q){
      throw new NotFoundException ("couldn't update date ");
    }
    return con ;
  }
  // get (id : string){
  //   const con = await this.findOne(id);
  //   const patient = this.userRepositor
  // }
}
