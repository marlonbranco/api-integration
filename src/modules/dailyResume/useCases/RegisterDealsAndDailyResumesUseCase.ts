import { injectable, inject, container } from 'tsyringe';
import {
  parseISO, startOfDay
} from 'date-fns';
import IDailyResumeRepository from '@modules/dailyResume/repositories/IDailyResumeRepository';
import IDailyResumeDTO from '../dtos/IDailyResumeDTO';
import IPipedriveResponseDTO from '../dtos/IPipedriveResponseDTO';
import UpdateDailyResumeUseCase from './UpdateDailyResumeUseCase';
import GenerateDailyResumeUseCase from './GenerateDailyResumeUseCase';

@injectable()
class RegisterDealsAndDailyResumesUseCase {
  constructor(
    @inject('DailyResumeRepository')
    private dailyResumeRepository: IDailyResumeRepository
  ) {}

  public async register(deals: IPipedriveResponseDTO[]): Promise<void> {
    const updateDailyResume = container.resolve(UpdateDailyResumeUseCase);
    const generateDailyResume = container.resolve(GenerateDailyResumeUseCase);
    const dealWonDates = deals.map((deal) => {
      const parsedDate = parseISO(deal.dealWonTime);
      const stringDate = startOfDay(parsedDate).toISOString()
      return stringDate;
    });

    const duplicatedDatesRemoved = [...new Set(dealWonDates)];

    const dailyResumesBatch: IDailyResumeDTO[] = []

    if (duplicatedDatesRemoved.length) {
      for await (const date of duplicatedDatesRemoved) {
        const parsedDate = parseISO(date);
        const dailyResumeExists = await this.dailyResumeRepository.findResumeByDate(parsedDate);

        if (dailyResumeExists) {
          await updateDailyResume.update(deals, parsedDate);
        } else {
          const newDailyResume = generateDailyResume.generate(deals, parsedDate);
          dailyResumesBatch.push(newDailyResume);
        }
      }
      if (dailyResumesBatch.length) {
        await this.dailyResumeRepository.insertMany(dailyResumesBatch);
      }
    }
  }
}

export default RegisterDealsAndDailyResumesUseCase;
