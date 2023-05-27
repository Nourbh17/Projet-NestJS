import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserSubscribeDto } from 'src/user/dto/user-subscribe.dto';
import { LoginCredentialsDto } from 'src/user/dto/login-credentials.dto';
import { UserEntity } from './entities/user.entity';
import { DoctorEntity } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class UserService {
  


  constructor(@InjectRepository(UserEntity)
   private userRepository: Repository<UserEntity>,
   private jwtService: JwtService 
   //private doctorRepository: Repository<DoctorEntity>
   ){}
        


        async register(userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
          const user= this.userRepository.create({
            ...userData
          });
          user.salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, user.salt);
          
          try {
            await this.userRepository.save(user);
          } catch (e) {
            throw new ConflictException(`email and password are unique`);
          }

          /*if (user.role=="doctor"){
            const doctor = this.doctorRepository.create({
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              password: user.password,
              salt: user.salt,
              role: user.role,})
            await this.doctorRepository.save(doctor);
          }*/

          return {
              id: user.id,
              firstname: user.firstname,
              lastname: user.firstname,
              email: user.email,
              role: user.role
            };
      
        }


        async login(credentials: LoginCredentialsDto)  {
         const {email, password} = credentials;
          const user = await this.userRepository.createQueryBuilder("users")
            .where("users.email = :email",
              {email}
              )
            .getOne();
            if (!user)
               throw new NotFoundException('username or password incorrect');
          
          const hashedPassword = await bcrypt.hash(password,user.salt);
          if (hashedPassword === user.password) {
            const payload = {
              id: user.id,
             role: user.role
            };
            const jwt = await this.jwtService.sign(payload);
            return {
              "access_token" : jwt
            };
          } else {
            
            throw new NotFoundException('username or password incorrect');
          }
        }
      
      
    }