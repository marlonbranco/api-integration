import { container } from 'tsyringe';

import './providers';

import IDailyResumeRepository from '@modules/dailyResume/repositories/IDailyResumeRepository';
import DailyResumeRepository from '@modules/dailyResume/infra/mongoose/repositories/DailyResumeRepository';

container.registerSingleton<IDailyResumeRepository>(
  'DailyResumeRepository',
  DailyResumeRepository
)
