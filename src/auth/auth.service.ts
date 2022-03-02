import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository, 
        private jwtService: JwtService) {}

    signUp(signUpDto: SignUpDto): Promise<void>{
        return this.userRepository.signUp(signUpDto);
    }

    async signIn(signInDto: SignInDto): Promise<{accessToken: string}> {
        const id = await this.userRepository.validateuserPassowrd(signInDto);
        
        if(!id){
            throw new UnauthorizedException("Either username or password is incorrect")
        }

        const payload: JwtPayload = {id};
        const accessToken = this.jwtService.sign(payload);

        return {accessToken};
    }

}
