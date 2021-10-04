import { model, Schema } from 'mongoose';

import IDailyResumeDTO from '@modules/integration/dtos/IDailyResumeDTO';

const DailyResumeSchema = new Schema<IDailyResumeDTO>({
  totalValue: { type: Number, required: true },
  totalWonDeals: { type: Number, required: true },
  resumeDate: { type: Date, required: true },
  wonDeals: [
    {
      dealId: { type: Number, required: true, unique: true },
      personId: { type: Number, required: true },
      personName: { type: String, required: true },
      title: { type: String, required: true },
      productsCount: { type: Number, required: true },
      weightedValue: { type: Number, required: true },
      dealWonTime: { type: Date, required: true }
    }
  ]
},
{ collection: 'dailyResumes' });

const DailyResume = model<IDailyResumeDTO>('dailyResumes', DailyResumeSchema);

export { DailyResume };
