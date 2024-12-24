import { Controller, Post, Body } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';

@Controller('email-sender')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post()
  create(@Body() data: any) {
    console.log('🚀 ~ EmailSenderController ~ create ~ data:', data);
    return this.emailSenderService.send(data);
  }
}
