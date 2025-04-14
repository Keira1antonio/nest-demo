import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MinSizeValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const maxSize = 200 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!value) {
      throw new BadRequestException('No se recibio ningun archivo');
    }

    if (value.size > maxSize) {
      throw new BadRequestException(
        `El archivo de la imagen no debe ser mayor a ${maxSize} bytes (200KB)`,
      );
    }

    if (!allowedTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        `Tipo de archivo no permitido ${allowedTypes.join(',')}`,
      );
    }

    return value;
  }
}
