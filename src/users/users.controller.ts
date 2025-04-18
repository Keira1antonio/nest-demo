import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Param,
  Query,
  Body,
  UseGuards,
  NotFoundException,
  BadRequestException,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DateAdderInterceptor } from '@/interceptors/date-adder.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { UserCredentialsDto } from '@/dtos/userCredentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
//import { CloudinaryService } from '../Cloudinary/cloudinary.service';
import { memoryStorage } from 'multer';

import { AuthGuard } from '@/guards/auth.guard';
import { Role } from '@/roles.unum';
import { Roles } from '@/decorator/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userDbService: UsersService,
    private readonly authService: AuthService,

    //private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(
    @Query('name') name?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    try {
      if (name) {
        return await this.usersService.getUserByName(name);
      }
      return await this.usersService.getUsers(page, limit);
    } catch (error) {
      throw new BadRequestException('Error getting users');
    }
  }

  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAdmin() {
    return 'Ruta protegida';
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: Request & { user: any },
  ) {
    try {
      const user = await this.usersService.getUserById(id);
      if (!user) throw new NotFoundException('User not found');
      if (user.data) {
        const { isAdmin, ...userWithoutAdmin } = user.data;
        return userWithoutAdmin;
      } else {
        throw new BadRequestException('Invalid user data');
      }
      console.log(request.user);
    } catch (error) {
      throw new BadRequestException('Error getting user');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userData: Partial<User>,
  ) {
    try {
      const updatedUser = await this.usersService.updateUser(id, userData);
      if (!updatedUser) throw new NotFoundException('User not found');
      return updatedUser;
    } catch (error) {
      throw new BadRequestException('Error updating user');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const deleteUser = await this.usersService.deleteUser(id);
      if (!deleteUser) throw new NotFoundException('User not found');
      return deleteUser;
    } catch (error) {
      throw new BadRequestException('Error deleting user');
    }
  }
}
