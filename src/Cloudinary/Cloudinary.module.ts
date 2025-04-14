import { Module, forwardRef } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { ProductsModule } from '@/ products/Products.module';
import { CloudinaryConfig } from '@/config/cloudinary';

@Module({
  imports: [forwardRef(() => ProductsModule)],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig],
  exports: [CloudinaryService], // Exporta si otros módulos lo requieren
})
export class CloudinaryModule {}
