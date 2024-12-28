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
      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to send email', details: error.message });
    }
  }
}
