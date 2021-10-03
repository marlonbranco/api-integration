import { container } from 'tsyringe';

import IBling from './models/IBlingOrdersUseCase';
import BlingOrdersUseCase from './useCases/BlingOrdersUseCase';

container.registerSingleton<IBling>('BlingOrdersUseCase', BlingOrdersUseCase);
