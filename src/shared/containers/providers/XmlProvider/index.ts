import { container } from 'tsyringe';

import IXmlProvider from './models/IXmlProvider';
import XmlBuilder2Provider from './implementations/XmlBuilder2Provider';

const providers = {
  xmlBuilder2: XmlBuilder2Provider,
};

container.registerSingleton<IXmlProvider>('XmlProvider', providers.xmlBuilder2);
