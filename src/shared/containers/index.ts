import { container } from 'tsyringe';

import './providers';

import IDailyResumeRepository from '@modules/integration/repositories/IDailyResumeRepository';
import DailyResumeRepository from '@modules/integration/infra/mongoose/repositories/DailyResumeRepository';

container.registerSingleton<IDailyResumeRepository>(
  'DailyResumeRepository',
  DailyResumeRepository
)
