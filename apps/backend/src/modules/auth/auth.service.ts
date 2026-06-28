import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // 🧠 REGISTER
  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const existingUser =
        await this.usersService.findByEmail(data.email);

      if (existingUser) {
        return {
          success: false,
          message: 'User already exists',
        };
      }

      const user =
        await this.usersService.create(data);

      return {
        success: true,
        user,
      };
    } catch (err) {
      console.error('🔥 REGISTER ERROR:', err);
      throw new UnauthorizedException('Register failed');
    }
  }

  // 🔐 LOGIN (SAFE + NO 500 EVER)
  async login(data: {
    email: string;
    password: string;
  }) {
    try {
      const user =
        await this.usersService.findByEmail(data.email);

      if (!user || !user.password) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const password = String(data.password || '');
      const hash = String(user.password || '');

      const isPasswordValid = await bcrypt.compare(
        password,
        hash,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      };
    } catch (err) {
      console.error('🔥 LOGIN ERROR:', err);

      // نحول أي خطأ لـ 401 بدل 500
      throw new UnauthorizedException('Login failed');
    }
  }
}