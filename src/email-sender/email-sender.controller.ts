import { Controller, Post, Body, Res } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { Response } from 'express';

@Controller('email-sender')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post()
  create(@Body() data: any, @Res() res: Response) {
    return this.emailSenderService.send(data);
  }
}
