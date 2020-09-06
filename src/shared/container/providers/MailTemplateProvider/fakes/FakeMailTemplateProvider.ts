import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemaplateProvider implements IMailTemplateProvider {
  public async parse({ template} : IParseMailTemplateDTO ): Promise<string>{
    return template;
  }
}

export default FakeMailTemaplateProvider;
