import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connects to the MongoDB database using the connection string from environment variables.
 * Logs a success message if the connection is established or an error if it fails.
 */
export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

/**
 * Disconnects from the MongoDB database.
 * Logs a success message if disconnected or an error if it fails.
 */
export const disconnectFromDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Failed to disconnect from MongoDB', err);
  }
};
