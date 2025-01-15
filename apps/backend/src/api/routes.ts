import { Router, Response, NextFunction } from 'express';
import { Queue } from 'bullmq';
import dotenv from 'dotenv';

import { Job } from '../db/schema';
import type { TypedRequestBody, TypedRequestParams, ComputeBody, JobParams, ComputeResponse } from '../types/express';

dotenv.config();

const router = Router();

const computeQueue = new Queue('compute', {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  },
});

/**
 * POST /api/compute
 * Adds a new computation job to the queue.
 */
router.post<{}, ComputeResponse, ComputeBody>(
  '/api/compute',
  async (req: TypedRequestBody<ComputeBody>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { a, b } = req.body;

      const job = new Job({ a, b, progress: 0, results: [] });
      await job.save();

      await computeQueue.add('computeTask', { jobId: job._id, a, b });
      res.status(200).json({ jobId: job._id });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/progress/:jobId
 * Retrieves the progress and results of a specific computation job.
 */
router.get<JobParams>(
  '/api/progress/:jobId',
  async (req: TypedRequestParams<JobParams>, res: Response, next: NextFunction) => {
    try {
      const { jobId } = req.params;
      const job = await Job.findById(jobId);

      if (!job) {
        res.status(404).json({ error: 'Job not found.' });
        return;
      }

      res.status(200).json({ progress: job.progress, results: job.results });
    } catch (error) {
      next(error);
    }
  }
);

export default router;