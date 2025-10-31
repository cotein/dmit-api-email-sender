import { Controller, Post, Body, Res } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { Response } from 'express';
import { RequestVerificationDto } from './dto/request-verification.dto';

@Controller('email-sender')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post('invoice')
  async sendinvoice(@Body() data: any, @Res() res: Response) {
    try {
      const response = await this.emailSenderService.sendinvoice(data);

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Error al enviar email', details: error.message });
    }
  }

  @Post('user-email-verification')
  async sendVerificationToUser(@Body() data: any, @Res() res: Response) {
    try {
      const response =
        await this.emailSenderService.sendEmailVerificationToUser(data);

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Error al enviar email', details: error.message });
    }
  }

  @Post('user-forgot-password')
  async sendPasswordResetEmail(@Body() data: any, @Res() res: Response) {
    try {
      const response =
        await this.emailSenderService.sendPasswordResetEmail(data);

      if (response.error) {
        return res.status(500).json(response.error);
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * NUEVO ENDPOINT: Solicita un código de verificación para el carrito.
   * Implementado de forma simple con 'any' para pruebas.
   */
  @Post('mmueble/cart/request-verification')
  async requestVerificationCode(
    @Body() data: RequestVerificationDto, // Acepta cualquier body (solo para pruebas)
    @Res() res: Response,
  ) {
    console.log("🚀 ~ EmailSenderController ~ requestVerificationCode ~ data:", data)
    try {
      // 1. Llamamos al servicio. 'data' debe tener { email, name, code }
      // El servicio `sendVerificationCode` es el que creamos antes.
      const response = await this.emailSenderService.sendVerificationCode(data);

      // 2. Si la línea anterior NO lanzó una excepción, fue exitosa.
      // El 'if (response.error)' se elimina.

      // 3. Devolvemos la respuesta exitosa.
      return res.status(200).json(response);
    } catch (error) {
      // 4. Si el servicio (Resend o el template) falla, lanzará
      // una excepción que será capturada aquí.
      console.error('Error in requestVerificationCode controller:', error);

      // Devolvemos el error 500
      return res.status(500).json({
        error: 'Internal Server Error',
        message: error.message || 'No se pudo procesar el envío de email.',
      });
    }
  }
}
