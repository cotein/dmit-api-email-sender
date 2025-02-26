import { Controller, Post, Body, Res } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { Response } from 'express';

@Controller('email-sender')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post()
  async create(@Body() data: any, @Res() res: Response) {
    try {
      const response = await this.emailSenderService.send(data);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Error al enviar email', details: error.message });
    }
  }
}
