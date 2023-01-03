import nodemailer from 'nodemailer';

interface ISendMail {
    to: string;
    body: string;
}

/**
 * Class responsible for mail services with Ethereal SMTP Service
 * @see https://ethereal.email/
 */
export default class EtherealMail {

    public static async sendMail({ to, body }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        const message = await transporter.sendMail({
            from: 'teamtest@apivendas.com',
            to,
            subject: 'Recuperação de senha',
            text: body
        })
        
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}