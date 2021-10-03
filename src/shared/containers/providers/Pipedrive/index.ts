import { container } from 'tsyringe';

import IPipedrive from './models/IPipedriveDealsUseCase';
import PipedriveDealsUseCase from './useCases/PipedriveDealsUseCase';

container.registerSingleton<IPipedrive>('PipedriveDealsUseCase', PipedriveDealsUseCase);
