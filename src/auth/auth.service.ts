import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }
    async login(email: string, password: string, session: Record<string, any>) {
        const user = await this.userRepository.findOne({ where: { email } })
        if(!user)
            return({
                message:{
                    'pl':"Nie znaleziono użytkownika",
                    'en':"User not found"
                }
            });
        const passwordValid = await this.validateUser(user, password);
        if(!passwordValid)
            return({message:'Invalid login credentials'});
        if(session.user){
            return({message:'User already logged in'});
        }
        session.user = user;
        session.isLoggedIn = true;
        return { message: 'Login successful', user };
    }
    async register(email: string, password: string) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            return({ message: 'User already exists' }); 
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User();
        newUser.email = email;
        newUser.password = hashedPassword;
        
        return this.userRepository.save(this.userRepository.create(newUser))
            .then(user => {
                return { message: 'User registered successfully', user };
            })
            .catch(err => {
                throw new Error(err.message);
            });
    }
    logout(session: Record<string, any>) {
        session.user = null;
        session.isLoggedIn = false;
        return { message: 'Logout successful' };
    }
    async validateUser(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password)
    }
}
