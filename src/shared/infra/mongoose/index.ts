import mongoose from 'mongoose';
import ErrorsApp from '@errors/ErrorsApp';

const databaseUrl: string | undefined = process.env.MONGODB_URI;

if (!databaseUrl) {
  throw new ErrorsApp('MONGODB_URI_NOT_DEFINED', 404);
}

const mongoConnection = mongoose.connect(databaseUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

const checkConnection = mongoose.connection;

checkConnection.on('error', (error) => console.error(error));
checkConnection.once('open', () => console.log('Connected to mongoDB'));

export default mongoConnection;
