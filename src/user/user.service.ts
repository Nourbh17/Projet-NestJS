import {ConflictException,Injectable,NotFoundException,} from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserSubscribeDto } from 'src/user/dto/user-subscribe.dto';
import { LoginCredentialsDto } from 'src/user/dto/login-credentials.dto';
import { UserEntity } from './entities/user.entity';

import { RoleEnum } from '../Enums/role.enum';
import { GenericCrudService } from '../Generics/service/generic-crud.service';
import { DoctorService } from '../doctor/doctor.service';
import { SpecialityService } from '../speciality/speciality.service';
import { SpecialityEntity } from '../speciality/entities/speciality.entity';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { DoctorEntity } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class UserService extends GenericCrudService<UserEntity> {
  
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private readonly doctorService: DoctorService,
    @InjectRepository(SpecialityEntity)
    private specialityRepository: Repository<SpecialityEntity>,
   /* private doctorRepository: Repository<DoctorEntity>,*/
    
  ) { super(userRepository);}
  
  async register(userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
    const user = this.userRepository.create({
      ...userData,
    });

    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);

    try {
      if (user.role === RoleEnum.DOCTOR) {
      const spec = userData.speciality;
      
      const q = await this.specialityRepository
      .createQueryBuilder('speciality')
      .where('speciality.name = :name', { name :  spec })
      .getOne();
      let doctor 
       doctor = {
        ...user ,
       
        speciality: q,
        visitprice: 0,
      };
      await this.doctorService.create(doctor);
    }
    else {
      await this.userRepository.save(user);
    }
      
    } catch (e) {
      throw new ConflictException(`email and password are unique`);
    }

    

    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };
  }

  /*async login(credentials: LoginCredentialsDto) {
    const { email, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email })
      .getOne();
      
      const doctor =this.doctorRepository
      .createQueryBuilder('doctors')
      .where('doctors.email = :email', { email })
      .getOne()
  ;
    if (!user && !doctor) throw new NotFoundException('username or password incorrect');
    if(user){
                 const hashedPassword = await bcrypt.hash(password, user.salt);
                 if (hashedPassword === user.password) {
                    const payload = {
                     id: user.id,
                      role: user.role,
                      authentificated: true,
                         };
                      const jwt = await this.jwtService.sign(payload);
                      return {
                       access_token: jwt,
        };
      }
                  else {
                     throw new NotFoundException('username or password incorrect');
                     }
    }
   else{

            const hashedPassword = await bcrypt.hash(password, doctor.salt);
            if (hashedPassword === doctor.password) {
               const payload = {
                  id:  doctor.id,
                  role: doctor.role,
                  authentificated: true,
                      };
            const jwt = await this.jwtService.sign(payload);
            return {
              access_token: jwt,
               };
                }
            else {
              throw new NotFoundException('username or password incorrect');
              }
   }
    
    
   



    
  }*/
}