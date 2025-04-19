import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../orders/Order.Controller';
import { OrderService } from '../orders/Order.Service';
import { JwtService } from '@nestjs/jwt'; // Importa JwtService

// Mock mínimo del servicio
const mockOrderService = {
  createOrder: jest.fn(),
  getOrderById: jest.fn(),
  getUserOrders: jest.fn(),
};

// Mock de JwtService
const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
        {
          provide: JwtService, // Proporciona JwtService mockeado
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('crea una orden correctamente', async () => {
    const mockOrder = { id: '1', total: 100 };
    mockOrderService.createOrder.mockResolvedValue(mockOrder);

    const result = await controller.createOrder({
      userId: 'user-1',
      products: [{ id: 'product-1' }],
    });
    expect(result).toEqual(mockOrder);
  });

  it('obtiene una orden por ID', async () => {
    const mockOrder = { id: '1', total: 100 };
    mockOrderService.getOrderById.mockResolvedValue(mockOrder);

    const result = await controller.getOrderById('1');
    expect(result).toEqual(mockOrder);
  });
});
