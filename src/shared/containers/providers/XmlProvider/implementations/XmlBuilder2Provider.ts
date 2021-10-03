import { create } from 'xmlbuilder2';
import IXmlProvider from '../models/IXmlProvider';

class XmlBuilder2Provider implements IXmlProvider {
  public generate(object: Object): any {
    const document = create({ version: '1.0', encoding: 'UTF-8' }, object);
    const xml = document.end({ prettyPrint: true });
    const strXml = String(xml);

    console.log(xml);

    return strXml;
  }
}

export default XmlBuilder2Provider;
