import { Repository } from 'typeorm';
import { Category } from '@/categories/Category.entity';
export declare class CategoryRepository {
    private readonly categoryRepo;
    constructor(categoryRepo: Repository<Category>);
    getCategories(): Promise<Category[]>;
    addCategories(names: string[]): Promise<Category[]>;
}
