export type EmailData = {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: any[];
  token?: string;
  name?: string;
};

export type EmailForgotPassword = {
  email: string;
  code: number;
  token: string;
};
