import {
  Controller,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  Param,
  NotFoundException,
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from '@/ products/products.service';
import { memoryStorage } from 'multer';
import { MinSizeValidator } from '@/pipe/MinSizeValidator.pipe';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async getUserImage(
    @UploadedFile(MinSizeValidator) file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new BadRequestException('No se proporcionó ningún archivo');
      }

      const result = await this.cloudinaryService.uploadFile(file);
      return {
        status: 'success',
        message: 'Archivo subido exitosamente',
        data: result,
      };
    } catch (error) {
      console.error('Error al subir el archivo:', error.message);
      throw new BadRequestException('No se pudo subir el archivo');
    }
  }

  @Put('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadProductImage(
    @Param('id', ParseUUIDPipe) id: string, // Valida el ID como UUID
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new BadRequestException('No se proporcionó ningún archivo');
      }

      // Subir la imagen a Cloudinary
      const uploadedImage = await this.cloudinaryService.uploadFile(file);

      if (!uploadedImage || !uploadedImage.secure_url) {
        throw new BadRequestException('Error al subir la imagen a Cloudinary');
      }

      // Actualizar la imagen en la base de datos
      const updatedProduct = await this.productsService.updateProductImage(
        id,
        uploadedImage.secure_url,
      );

      if (!updatedProduct) {
        throw new NotFoundException('Producto no encontrado');
      }

      return {
        status: 'success',
        message: 'Imagen actualizada correctamente',
        data: updatedProduct,
      };
      console.log('Archivo recibido:', file);
    } catch (error) {
      console.error(
        'Error al actualizar la imagen del producto:',
        error.message,
      );
      throw new BadRequestException(
        'No se pudo actualizar la imagen del producto',
      );
    }
  }
}
