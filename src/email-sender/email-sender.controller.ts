import { Controller, Post, Body, Res } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { Response } from 'express';

@Controller('email-sender')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post()
  create(@Body() data: any, @Res() res: Response) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    console.log('🚀 ~ EmailSenderController ~ create ~ data:', data);
    return this.emailSenderService.send(data);
  }
}
