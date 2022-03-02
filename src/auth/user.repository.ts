import { ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(signUpDto: SignUpDto): Promise<void> {
        const {username, password, role} = signUpDto;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt();
        
        const user = new User();
        user.username = username;
        user.role = role;
        user.password = await this.hashPassword(password,salt);
        console.log(user.password);

        
        try {
            await user.save();
        } catch(error){
            console.log(error);
            throw new ConflictException("User already exists");
        };
    }

    async validateuserPassowrd(signInDto: SignInDto): Promise<number>{
        const {id, password} = signInDto;

        const user = await this.findOne(id);

        if(user && await user.validatePassowrd(password)){
            return user.id;
        }
        else {
            return null;
        }
    }

    async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password,salt);
    }
}