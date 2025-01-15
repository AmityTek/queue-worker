import { Worker } from 'bullmq';
import dotenv from 'dotenv';

import { Job } from '../db/schema';
import { callOpenAI } from '../services/openAIService';

dotenv.config();

const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
};

/**
 * Worker to process computation jobs from the "compute" queue.
 * Each job performs four operations (Addition, Subtraction, Multiplication, Division).
 */
export const worker = new Worker(
  'compute',
  async (job) => {
    const { jobId, a, b } = job.data;
    const dbJob = await Job.findById(jobId);

    if (!dbJob) {
      throw new Error(`Job with ID ${jobId} not found`);
    }

    const operations = [
      { operation: 'Addition', formula: `${a} + ${b}` },
      { operation: 'Subtraction', formula: `${a} - ${b}` },
      { operation: 'Multiplication', formula: `${a} * ${b}` },
      { operation: 'Division', formula: b !== 0 ? `${a} / ${b}` : 'NaN' },
    ];

    const results = await Promise.all(
      operations.map(async ({ operation, formula }) => {
        const result = formula === 'NaN' ? 'NaN' : await callOpenAI(formula);
        return { operation, result };
      })
    );

    dbJob.results.push(...results);
    dbJob.progress = 100;
    await dbJob.save();

    return results;
  },
  { connection: redisConnection }
);
