// request-verification.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class RequestVerificationDto {
  @IsString()
  @IsNotEmpty()
  to: string; // El email de destino

  @IsString()
  @IsNotEmpty()
  code: string; // El código de verificación

}