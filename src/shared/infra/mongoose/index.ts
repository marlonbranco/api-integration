import mongoose from 'mongoose';
import ErrorsApp from '@errors/ErrorsApp';

const databaseUrl: string | undefined = process.env.MONGODB_URI;

if (!databaseUrl) {
  throw new ErrorsApp('MONGODB_URI_NOT_DEFINED', 404);
}
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
};

const mongooseConnection = mongoose.connect(databaseUrl, mongooseOptions);

const checkConnection = mongoose.connection;

checkConnection.on('error', (error) => console.error(error));
checkConnection.once('open', () => console.log('[MONGOOSE] Connected to MongoDB'));

export default mongooseConnection;
