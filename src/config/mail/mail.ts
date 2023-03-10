interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            name: string;
            email: string;
        }
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            name: 'Gustavo Uliano',
            email: 'contato@gustavouliano.dev.br'
        }
    }
} as IMailConfig;