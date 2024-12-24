import { PartialType } from '@nestjs/swagger';
import { CreateEmailSenderDto } from './create-email-sender.dto';

export class UpdateEmailSenderDto extends PartialType(CreateEmailSenderDto) {}
