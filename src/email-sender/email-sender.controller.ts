import { Controller, Post, Body, Res } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { Response } from 'express';

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
    console.log(
      '🚀 ~ EmailSenderController ~ sendPasswordResetEmail ~ data:',
      data,
    );
    try {
      const response =
        await this.emailSenderService.sendPasswordResetEmail(data);
      console.log(
        '🚀 ~ EmailSenderController ~ sendPasswordResetEmail ~ response:',
        response,
      );

      if (response.error) {
        return res.status(500).json(response.error);
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
