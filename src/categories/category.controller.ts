import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Obtener todas las categorías
  @Get()
  async getCategories() {
    try {
      return await this.categoryService.getAllCategories();
    } catch (error) {
      throw new BadRequestException('Error getting categories');
    }
  }

  // Endpoint para precargar categorías manuales
  @Get('manual-seeder')
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
  async preloadCategoriesFromFile() {
    try {
      return await this.categoryService.preloadCategoriesFromFile();
    } catch (error) {
      throw new BadRequestException('Error preloading categories from file');
    }
  }
}
