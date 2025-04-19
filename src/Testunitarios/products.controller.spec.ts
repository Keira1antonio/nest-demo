import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsController } from '../products/Products.controller';
import { ProductsService } from '../products/products.service';
import { AuthGuard } from '@/guards/auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Role } from '@/roles.unum';
import { Product } from '../products/products.entity';

// Mock completo del servicio
const mockProductsService = {
  getProducts: jest.fn(),
  getProductsById: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  preloadProducts: jest.fn(),
};

const mockAuthGuard = { canActivate: jest.fn(() => true) };
const mockRolesGuard = { canActivate: jest.fn(() => true) };

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks(); // Limpiar mocks entre tests
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ----------------------------
  // TEST PARA getProducts
  // ----------------------------
  describe('getProducts', () => {
    it('should return paginated products', async () => {
      const mockProducts = [{ id: '1', name: 'Product 1' }];
      mockProductsService.getProducts.mockResolvedValue(mockProducts);

      const result = await controller.getProducts(1, 5);
      expect(result).toEqual(mockProducts);
      expect(service.getProducts).toHaveBeenCalledWith(1, 5);
    });

    it('should use default pagination values', async () => {
      await controller.getProducts();
      expect(service.getProducts).toHaveBeenCalledWith(1, 5);
    });

    it('should throw BadRequestException on error', async () => {
      mockProductsService.getProducts.mockRejectedValue(new Error());
      await expect(controller.getProducts()).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ----------------------------
  // TEST PARA getProductById
  // ----------------------------
  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const mockProduct = { id: '1', name: 'Product 1' };
      mockProductsService.getProductsById.mockResolvedValue(mockProduct);

      const result = await controller.getProductById('1');
      expect(result).toEqual(mockProduct);
      expect(service.getProductsById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockProductsService.getProductsById.mockResolvedValue(null);
      await expect(controller.getProductById('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ----------------------------
  // TEST PARA createProduct
  // ----------------------------
  describe('createProduct', () => {
    it('should create a product', async () => {
      const newProduct = { name: 'New Product', price: 100 };
      mockProductsService.createProduct.mockResolvedValue(newProduct);

      const result = await controller.createProduct(newProduct as Product);
      expect(result).toEqual(newProduct);
      expect(service.createProduct).toHaveBeenCalledWith(newProduct);
    });

    it('should throw BadRequestException on error', async () => {
      mockProductsService.createProduct.mockRejectedValue(new Error());
      await expect(controller.createProduct({} as Product)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ----------------------------
  // TEST PARA updateProduct (con Guards)
  // ----------------------------
  describe('updateProduct', () => {
    it('should update a product (Admin only)', async () => {
      const updatedProduct = { id: '1', name: 'Updated Product' };
      mockProductsService.updateProduct.mockResolvedValue(updatedProduct);

      const result = await controller.updateProduct(
        '1',
        updatedProduct as Product,
      );
      expect(result).toEqual(updatedProduct);
      expect(service.updateProduct).toHaveBeenCalledWith('1', updatedProduct);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockProductsService.updateProduct.mockResolvedValue(null);
      await expect(
        controller.updateProduct('999', {} as Product),
      ).rejects.toThrow(NotFoundException);
    });

    // Verifica que los Guards estén aplicados
    it('should enforce Admin role', () => {
      const metadata = Reflect.getMetadata('roles', controller.updateProduct);
      expect(metadata).toEqual([Role.Admin]);
    });
  });

  // ----------------------------
  // TEST PARA deleteProduct
  // ----------------------------
  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      mockProductsService.deleteProduct.mockResolvedValue(true);
      const result = await controller.deleteProduct('1');
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockProductsService.deleteProduct.mockResolvedValue(false);
      await expect(controller.deleteProduct('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ----------------------------
  // TEST PARA preloadProducts
  // ----------------------------
  describe('preloadProducts', () => {
    it('should preload products', async () => {
      mockProductsService.preloadProducts.mockResolvedValue([
        'product1',
        'product2',
      ]);
      const result = await controller.preloadProducts();
      expect(result).toEqual(['product1', 'product2']);
    });

    it('should throw BadRequestException on error', async () => {
      mockProductsService.preloadProducts.mockRejectedValue(new Error());
      await expect(controller.preloadProducts()).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
