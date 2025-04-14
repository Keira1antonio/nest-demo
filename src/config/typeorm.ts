import { DataSource, DataSourceOptions, Migration } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

// Cargar las variables de entorno
dotenvConfig();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

// Configuración de TypeORM
const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

// Registro de la configuración en NestJS
export default registerAs('typeorm', () => config);

// Crear la fuente de conexión de TypeORM
export const connectionSource = new DataSource(config as DataSourceOptions);

// Exporta el módulo si es el archivo principal
if (require.main === module) {
  module.exports = connectionSource;
}

console.log('Database Config:', config);
