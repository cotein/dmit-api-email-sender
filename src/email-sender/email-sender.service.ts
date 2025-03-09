import { EmailForgotPassword } from './../types/Email';
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import type { EmailData } from 'src/types/Email';
import { verifyEmailTemplate } from './email-templates/verifyEmailtemplate';
import { forgotPasswordEmailtemplate } from './email-templates/forgotPasswordEmailtemplate';

@Injectable()
export class EmailSenderService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.API_KEY_SEND_EMAIL);
  }
  // Create a new instance of Resend
  async sendinvoice(email: EmailData) {
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

  async sendEmailVerificationToUser(email: EmailData) {
    const from = 'DMIT - Facturador Online <info@dmit.ar>';
    const subject =
      'Verifica tu correo electrónico en DMIT - Facturador online';

    const verificationUrl = `https://www.facturador.dmit.ar/verify-email?token=${email.token}`;

    const html = verifyEmailTemplate(email.name, verificationUrl);

    try {
      const response = await this.resend.emails.send({
        from: from,
        to: email.to,
        subject: subject,
        html: html,
      });

      return response;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendPasswordResetEmail(data: EmailForgotPassword) {
    const from = 'DMIT - Facturador Online <info@dmit.ar>';

    const subject = 'Restablece tu contraseña en DMIT - Facturador online';

    const url = `https://www.facturador.dmit.ar/restablecer-contrasena?token=${data.token}`;

    const html = forgotPasswordEmailtemplate(url);

    try {
      const response = await this.resend.emails.send({
        from: from,
        to: data.email,
        subject: subject,
        html: html,
      });
      console.log(
        '🚀 ~ EmailSenderService ~ sendPasswordResetEmail ~ response:',
        response,
      );

      return response;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
