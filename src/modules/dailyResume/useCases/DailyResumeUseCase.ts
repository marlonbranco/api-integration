import { injectable, inject } from 'tsyringe';
import { parseISO } from 'date-fns';
import IDailyResumeRepository from '@modules/dailyResume/repositories/IDailyResumeRepository';
import IDailyResumeDTO from '../dtos/IDailyResumeDTO'

@injectable()
class DailyResumeUseCase {
  constructor(
    @inject('DailyResumeRepository')
    private dailyResumeRepository: IDailyResumeRepository
  ) {}

  public async getDailyResumes(date?: any): Promise<IDailyResumeDTO[]> {
    console.log(date);
    if (date) {
      console.log(date);
      const parsedDate = parseISO(date);
      return this.dailyResumeRepository.findResumeByDate(parsedDate)
    }
    return this.dailyResumeRepository.listAllDailyResumes();
  }
}

export default DailyResumeUseCase;
