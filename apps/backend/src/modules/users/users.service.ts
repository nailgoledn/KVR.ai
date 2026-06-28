import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 🔍 Find by email (IMPORTANT FOR LOGIN)
  async findByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.password'])
      .where('user.email = :email', { email })
      .getOne();
  }

  // 📋 Get all users
  async findAll() {
    return this.userRepository.find();
  }

  // 👤 Get one user
  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  // 🧠 CREATE USER
  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const usersCount = await this.userRepository.count();

    const role =
      usersCount === 0
        ? 'admin'
        : data.role || 'user';

    const user = await this.userRepository.save({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role,
    });

    const { password, ...safeUser } = user;

    return safeUser;
  }

  // ✏️ Update user
  async update(id: number, data: any) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    await this.userRepository.update(id, data);

    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });

    return updatedUser;
  }

  // 🗑️ Delete user
  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);

    return {
      message: 'User deleted successfully',
    };
  }
}