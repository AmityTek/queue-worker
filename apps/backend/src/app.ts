import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import router from './api/routes';
import './workers/computeWorker';
import { connectToDB, disconnectFromDB } from './db/connection';
import rateLimit from 'express-rate-limit';



const app = express();
let server: ReturnType<typeof app.listen>;

// rate limiting by IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});


// add security headers
app.use(helmet());

// cors protection
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(express.json());

app.use(router);

// handling errors
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error Stack:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});


const startServer = async () => {
  try {
    await connectToDB();
    server = app.listen(3001, () => {
      console.log('Backend server is running on http://localhost:3001');
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

const shutdownServer = async () => {
  console.log('Shutting down server...');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
    });
  }
  await disconnectFromDB();
  console.log('MongoDB disconnected');
  process.exit(0);
};


// handle shutdown signals
process.on('SIGINT', shutdownServer);
process.on('SIGTERM', shutdownServer);

startServer();

export default app;
