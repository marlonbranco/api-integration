import { RecurrenceRule, scheduleJob } from 'node-schedule';
import { container } from 'tsyringe';
import { performance } from 'perf_hooks';
import IntegrationUseCase from '@modules/integration/useCases/IntegrationUseCase';

const rule = new RecurrenceRule();
rule.second = 10;

const scheduledJob = scheduleJob(rule, async () => {
  const initialTime = performance.now();
  console.log('[NODE-SCHEDULE] Integration initiated.')
  const integration = container.resolve(IntegrationUseCase);

  await integration.registerWonDealsOnBling();
  const finishedTime = performance.now();
  const durationInSeconds = (((finishedTime - initialTime) * 100) / 1000) / 100;
  console.log('[NODE-SCHEDULE] Integration done in:', `${durationInSeconds.toPrecision(2)}s`)
})

export default scheduledJob;
