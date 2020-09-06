import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemaplateProvider implements IMailTemplateProvider {
  public async parse({}): Promise<string>{
    return 'Mail content';
  }
}

export default FakeMailTemaplateProvider;
