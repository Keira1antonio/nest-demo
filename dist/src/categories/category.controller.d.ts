import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<import("./Category.entity").Category[]>;
    preloadCategories(): Promise<import("./Category.entity").Category[]>;
    preloadCategoriesFromFile(): Promise<import("./Category.entity").Category[]>;
}
