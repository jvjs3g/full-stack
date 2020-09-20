interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'joao3klb@hotmail.com',
      name: 'jooa vitor de jesus silva',
    },
  },
} as IMailConfig;
