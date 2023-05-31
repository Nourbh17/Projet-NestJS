import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from '../Generics/service/generic-crud.service';
import { ConsultationEntity } from './entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { RtcTokenBuilder,RtmTokenBuilder, RtcRole } from "agora-token";


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
  async getAcceptedConsultation (id : string): Promise<ConsultationEntity[]>{
    const con = await this.consultationRepository
    .createQueryBuilder('c')
    .where("s.acceptee = 1 AND ((s.patient = :id) OR (s.doctor = :id) ) ", {id : id})
    .getMany();
    if (!con)
      throw new NotFoundException(" couldn't find accepted consultations ");
    return con ;
  }

  async getRequests (id : string) : Promise<ConsultationEntity[]>{
    const con = await this.consultationRepository
    .createQueryBuilder('c')
    .where("s.acceptee = 0 AND ((s.patient = :id) OR (s.doctor = :id) ) ", {id : id})
    .getMany();
    if (!con)
      throw new NotFoundException(" couldn't find accepted consultations ");
    return con ;
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
    return this.generateToken(con);
  }
  // get (id : string){
  //   const con = await this.findOne(id);
  //   const patient = this.userRepositor
  // }

 generateToken (con : ConsultationEntity ) : string {
    // Rtc Examples
    const appId = '579dcf9764df40d2b0d5dd2571e659b1';
    const appCertificate = 'e879ef0eca834e24b5a05edd4729e717';
    const channelName = con.channel ;

    const userAccount = "";
    const role = RtcRole.PUBLISHER;
  
    const expirationTimeInSeconds = 86400 ;
  
    const timestamp = con.date.getSeconds();

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = timestamp + expirationTimeInSeconds;
 
    // Build token with user account
    return RtcTokenBuilder.buildTokenWithUserAccount(appId, appCertificate, channelName, userAccount, role,timestamp, privilegeExpiredTs);
    
  }
}
