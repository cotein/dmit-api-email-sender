import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailSenderService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.API_KEY_SEND_EMAIL);
  }
  // Create a new instance of Resend
  async send(email: any) {
    console.log('🚀 ~ EmailSenderService ~ send ~ email:', email);
    try {
      const response = await this.resend.emails.send({
        from: email.from,
        to: email.to,
        subject: email.subject,
        html: email.html,
        attachments: email.attachments,
      });

      return response;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  findAll() {
    return `This action returns all emailSender`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailSender`;
  }

  update(id: number) {
    return `This action updates a #${id} emailSender`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailSender`;
  }
}
