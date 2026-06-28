import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";

@Controller("users")
@UseGuards(JwtAuthGuard) // 🔐 حماية JWT فقط (بدون Roles مؤقتًا)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 🧠 Create user
  @Post()
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  // 📋 Get all users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // 👤 Get user by ID
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  // ✏️ Update user
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.usersService.update(+id, body);
  }

  // 🗑️ Delete user
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}