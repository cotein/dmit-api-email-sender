import { EmailForgotPassword } from './../types/Email';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';
import type { EmailData } from 'src/types/Email';
import { verifyEmailTemplate } from './email-templates/verifyEmailtemplate';
import { forgotPasswordEmailtemplate } from './email-templates/forgotPasswordEmailtemplate';
import { verificationCodeTemplate } from './email-templates/mmueble-verification-code';
import { RequestVerificationDto } from './dto/request-verification.dto';

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

    const verificationUrl = `https://facturador.dmit.ar/verify-email?token=${email.token}`;

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

    const url = `https://facturador.dmit.ar/restablecer-contrasena?token=${data.token}`;

    const html = forgotPasswordEmailtemplate(url);

    try {
      const response = await this.resend.emails.send({
        from: from,
        to: data.email,
        subject: subject,
        html: html,
      });

      return response;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendVerificationCode(dto: RequestVerificationDto) {
    const { to, code } = dto;

    const from = 'MUNDO MUEBLE <info@dmit.ar>';
    const subject = 'Tu código de verificación de compra';

    //try {
    // 1. Obtener datos estáticos desde .env
    const logoUrl =
      'https://www.dev.mundomueble.sytes.net/images/logos/logo_mund_mueble_transparente.png';
    const companyName = 'MUNDO MUEBLE';
    const companyAddress = '';

    // 2. Renderizar el template
    const html = verificationCodeTemplate({
      code,
      logoUrl,
      companyName,
      companyAddress,
    });

    // 3. Enviar con Resend
    const response = await this.resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });

    if (response.error) {
      console.error('Error from Resend:', response.error);
      throw new InternalServerErrorException(
        'Error al enviar el correo desde Resend.',
      );
    }

    return {
      message: 'Correo de verificación enviado con éxito.',
      resendId: response.data.id,
    };
    /* } catch (error) {
      console.error('Error in sendVerificationCode:', error);
      throw new InternalServerErrorException(
        'Error interno al procesar el envío.',
      );
    } */
  }
}
