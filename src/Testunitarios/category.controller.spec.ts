import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../categories/category.controller';
import { CategoryService } from '../categories/category.service';
import { BadRequestException } from '@nestjs/common';

// Mock básico del servicio
const mockCategoryService = {
  getAllCategories: jest.fn(),
  preloadCategories: jest.fn(),
  preloadCategoriesFromFile: jest.fn(),
};

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('getCategories', () => {
    it('debería retornar todas las categorías', async () => {
      const mockCategories = ['categoría1', 'categoría2'];
      mockCategoryService.getAllCategories.mockResolvedValue(mockCategories);

      const result = await controller.getCategories();
      expect(result).toEqual(mockCategories);
    });

    it('debería lanzar error si falla', async () => {
      mockCategoryService.getAllCategories.mockRejectedValue(new Error());
      await expect(controller.getCategories()).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('preloadCategories', () => {
    it('debería precargar categorías manuales', async () => {
      const mockResult = { message: 'Categorías precargadas' };
      mockCategoryService.preloadCategories.mockResolvedValue(mockResult);

      const result = await controller.preloadCategories();
      expect(result).toEqual(mockResult);
    });
  });

  describe('preloadCategoriesFromFile', () => {
    it('debería precargar categorías desde archivo', async () => {
      const mockResult = { message: 'Categorías cargadas desde archivo' };
      mockCategoryService.preloadCategoriesFromFile.mockResolvedValue(
        mockResult,
      );

      const result = await controller.preloadCategoriesFromFile();
      expect(result).toEqual(mockResult);
    });
  });
});
