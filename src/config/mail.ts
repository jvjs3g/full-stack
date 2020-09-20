interface ImailConfig{
  driver: 'ethereal';

  defaults: {
    from: {
      email:string,
      name: string,
    };
  };
}

export default  {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults : {
    from: {
      email: 'joao3klb@hotmail.com',
      name:' joao vitor '
    },
  },
} as  ImailConfig;
