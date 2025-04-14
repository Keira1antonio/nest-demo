import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Category } from '@/categories/Category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  // Obtener todas las categorías
  async getCategories(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  // Agregar categorías evitando duplicados por nombre
  async addCategories(names: string[]): Promise<Category[]> {
    // Buscar nombres que ya existen
    const existing = await this.categoryRepo.find({
      where: { name: In(names) },
    });

    const existingNames = existing.map((cat) => cat.name);

    // Filtrar los que no están repetidos
    const newNames = names.filter((name) => !existingNames.includes(name));

    // Crear instancias de las nuevas categorías
    const newCategories = newNames.map((name) =>
      this.categoryRepo.create({ name }),
    );

    if (newCategories.length === 0) {
      return existing;
    }

    // Guardar y retornar las nuevas categorías
    return await this.categoryRepo.save(newCategories);
  }
}
