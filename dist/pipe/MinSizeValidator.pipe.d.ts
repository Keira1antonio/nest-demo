import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class MinSizeValidator implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
