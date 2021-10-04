import { container } from 'tsyringe';
import { Request, Response } from 'express';

import DailyResumeUseCase from '@modules/dailyResume/useCases/DailyResumeUseCase';

class DailyResumeController {
  public async index(request: Request, response: Response) {
    const { date } = request.query;
    const dailyResumeUseCase = container.resolve(DailyResumeUseCase);

    const dailyResumes = await dailyResumeUseCase.getDailyResumes(date);

    return response.status(200).json(dailyResumes);
  }
}

export default new DailyResumeController();
