import { CategoryRepository } from './category.repository';
import { Category } from './Category.entity';
export declare class CategoryService {
    private readonly categoryRepo;
    constructor(categoryRepo: CategoryRepository);
    getAllCategories(): Promise<Category[]>;
    preloadCategories(categoryNames: string[]): Promise<Category[]>;
    preloadCategoriesFromFile(): Promise<Category[]>;
}
