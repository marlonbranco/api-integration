import { injectable, inject } from 'tsyringe';
import IDailyResumeRepository from '@modules/dailyResume/repositories/IDailyResumeRepository';
import IDailyResumeDTO from '../dtos/IDailyResumeDTO'

@injectable()
class DailyResumeUseCase {
  constructor(
    @inject('DailyResumeRepository')
    private dailyResumeRepository: IDailyResumeRepository
  ) {}

  public async getDailyResumes(date?: any): Promise<IDailyResumeDTO[]> {
    if (date) {
      const parsedDate = new Date(date);
      return this.dailyResumeRepository.findResumeByDate(parsedDate)
    }
    return this.dailyResumeRepository.listAllDailyResumes();
  }
}

export default DailyResumeUseCase;
