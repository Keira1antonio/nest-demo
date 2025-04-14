import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './Category.entity';
import { preload } from '../data/ArchivoActividad3.js';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  // Servicio para obtener todas las categorías
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepo.getCategories();
  }

  async preloadCategories(categoryNames: string[]): Promise<Category[]> {
    return await this.categoryRepo.addCategories(categoryNames);
  }

  async preloadCategoriesFromFile(): Promise<Category[]> {
    const categoriesFromFile: string[] = preload.map((item) => item.category);
    const uniqueCategories = [...new Set(categoriesFromFile)];
    return await this.categoryRepo.addCategories(uniqueCategories);
  }
}
