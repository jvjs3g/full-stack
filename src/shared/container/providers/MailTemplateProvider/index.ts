import { container } from 'tsyringe';
import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandlebarsTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';

const providers = {
  handlebars: HandlebarsTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
  );

