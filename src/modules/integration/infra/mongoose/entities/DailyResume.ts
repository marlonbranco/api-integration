import { model, Schema } from 'mongoose';

import IDailyResumeDTO from '@modules/integration/dtos/IDailyResumeDTO';

const DailyResumeSchema = new Schema<IDailyResumeDTO>({
  totalValue: { type: Number, required: true },
  totalWonDeals: { type: Number, required: true },
  wonDeals: [
    {
      dealId: { type: Number, required: true, unique: true },
      personId: { type: Number, required: true },
      personName: { type: String, required: true },
      title: { type: String, required: true },
      productsCount: { type: Number, required: true },
      weightedValue: { type: Number, required: true },
      won_time: { type: Date, required: true }
    }
  ]
});

const DailyResume = model<IDailyResumeDTO>('DailyResume', DailyResumeSchema);

export { DailyResume };
