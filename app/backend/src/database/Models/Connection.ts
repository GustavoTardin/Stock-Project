import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URL as string,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;