import { RecurrenceRule, scheduleJob } from 'node-schedule';
import { container } from 'tsyringe';
import { performance } from 'perf_hooks';
import IntegrationUseCase from '@modules/integration/useCases/IntegrationUseCase';
import ErrorsApp from '@errors/ErrorsApp';

const rule = new RecurrenceRule();
rule.second = [0, 9, 19, 29, 39, 49, 59];

const scheduledJob = scheduleJob(rule, async () => {
  try {
    const initialTime = performance.now();
    console.log('[NODE-SCHEDULE] Migration initiated.')

    const integration = container.resolve(IntegrationUseCase);

    await integration.registerWonDealsOnBling();

    const finishedTime = performance.now();
    const durationInSeconds = (((finishedTime - initialTime) * 100) / 1000) / 100;
    console.log('[NODE-SCHEDULE] Migration done in:', `${durationInSeconds.toPrecision(2)}s`)
  } catch (error: any) {
    throw new ErrorsApp(error)
  }
})

export default scheduledJob;
