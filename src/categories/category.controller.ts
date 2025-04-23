import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Obtener todas las categorías
  @Get()
  @HttpCode(200)
  async getCategories() {
    try {
      return await this.categoryService.getAllCategories();
    } catch (error) {
      throw new BadRequestException('Error getting categories');
    }
  }

  // Endpoint para precargar categorías manuales
  @Get('manual-seeder')
  @HttpCode(200)
  async preloadCategories() {
    try {
      const names = ['smartphone', 'monitor', 'keyboard', 'mouse'];
      return await this.categoryService.preloadCategories(names);
    } catch (error) {
      throw new BadRequestException('Error preloading categories');
    }
  }

  // Endpoint para precargar categorías desde archivo
  @Get('seeder')
  @HttpCode(200)
  async preloadCategoriesFromFile() {
    try {
      return await this.categoryService.preloadCategoriesFromFile();
    } catch (error) {
      throw new BadRequestException('Error preloading categories from file');
    }
  }
}
