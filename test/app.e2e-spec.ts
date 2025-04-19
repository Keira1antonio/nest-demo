import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthService } from '../src/users/auth.service';
import { ProductsService } from '../src/products/products.service';

// Mocks para los servicios
const mockAuthService = {
  register: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com' }),
  login: jest.fn().mockResolvedValue({ access_token: 'fake-token' }),
};

const mockProductsService = {
  getProducts: jest.fn().mockResolvedValue([{ id: '1', name: 'Product 1' }]),
  createProduct: jest.fn().mockResolvedValue({ id: '1', name: 'New Product' }),
};

describe('AppController (e2e) - SIN BASE DE DATOS', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    it('/auth/register (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'test@test.com', password: '123456' })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(mockAuthService.register).toHaveBeenCalled();
    });

    it('/auth/login (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@test.com', password: '123456' })
        .expect(200);

      expect(response.body).toHaveProperty('access_token');
    });
  });

  describe('Products', () => {
    it('/products (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(mockProductsService.getProducts).toHaveBeenCalled();
    });

    it('/products (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/products')
        .send({ name: 'New Product', price: 100 })
        .set('Authorization', 'Bearer fake-token')
        .expect(201);

      expect(response.body).toHaveProperty('id');
    });
  });
});
