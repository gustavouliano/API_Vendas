import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import { HandlebarsMailTemplate } from './HandlebarsMailTemplate';
import mailConfig from '@config/mail/mail';

interface IMailContact {
    name: string;
    email: string;
}

interface ITemplateVariable {
    [key: string]: string;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class SESMail {

    public static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
        const handlebarsMailTemplate = new HandlebarsMailTemplate();

        const transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01'
            })
        });

        const { name, email } = mailConfig.defaults.from;

        transporter.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await handlebarsMailTemplate.parse(templateData)
        });
    }

}