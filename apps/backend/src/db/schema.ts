import mongoose from 'mongoose';

/**
 * Interface defining the structure of a Job document in the MongoDB database.
 */
interface JobDocument extends mongoose.Document {
  a: number;
  b: number;
  results: { operation: string; result: string }[];
  progress: number;
}

/**
 * Mongoose schema for the Job document.
 * Fields:
 * - `a`: First number (required)
 * - `b`: Second number (required)
 * - `results`: Array of results for operations like addition, subtraction, etc.
 * - `progress`: Computation progress percentage (default 0)
 */
const jobSchema = new mongoose.Schema<JobDocument>({
  a: { type: Number, required: true },
  b: { type: Number, required: true },
  results: {
    type: [
      {
        operation: { type: String, required: true },
        result: { type: String, required: true },
      },
    ],
    default: [],
  },
  progress: { type: Number, default: 0 },
});


/**
 * Mongoose model for the Job document.
 * Provides an interface to interact with the Job collection in MongoDB.
 */
export const Job = mongoose.model<JobDocument>('Job', jobSchema);
