const mongodbURI = process.env.MONGODB_URI!;
const collection = process.env.AGENDA_COLLECTION;
export const config = {
  name: 'workerSynapse',
  db: {
    address: mongodbURI,
    collection,
  },
  options: {
    useUnifiedTopology: true,
  },
  defaultConcurrency: 1,
  lockLimit: 1
};
