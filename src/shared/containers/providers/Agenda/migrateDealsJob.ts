import { Agenda } from 'agenda/es';
import { container } from 'tsyringe';
import IntegrateUseCase from '@modules/integration/useCases/IntegrationUseCase';
import { config } from './infra/mongodb'

const agenda = new Agenda(config);

async function execute() {
  agenda.define('MIGRATE-PIPEDRIVE-DEALS-TO-BLING-ORDERS',
    { priority: 'high', concurrency: 1, lockLimit: 1 },
    async (job, done) => {
      try {
        const integration = container.resolve(IntegrateUseCase);
        await integration.registerWonDealsOnBling()
        console.log('DATA MIGRATED');
        done();
      } catch (err: any) {
        job.fail(err);
      }
    });
  agenda.every('5 seconds', 'MIGRATE-PIPEDRIVE-DEALS-TO-BLING-ORDERS');
}

(async function () {
  await agenda.start();
  await execute();
}());

export default agenda;
