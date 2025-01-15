# **QueueApp Documentation**

QueueApp is a containerized application for demonstrating queue-based computations with a frontend and backend using Docker Compose. The application manages tasks asynchronously using a queue-worker system.

---

## **Features**

- **Frontend**: Built with **React/Next.js** for a clean and responsive user interface.
- **Backend**: Developed with **Node.js** using **BullMQ** for queue management and **Redis** for job handling.
- **Database**: Uses **MongoDB** for storing computation tasks and results.
- **Real-Time Updates**: Displays results of computational tasks.
- **Concurrent Job Processing**: Executes multiple tasks concurrently using a custom worker system.
- **Containerized**: Fully containerized with **Docker Compose** for seamless deployment and scalability.
- **Unit Tests**: Includes tests for both backend and frontend to ensure code reliability and quality.

---

## **Project Structure**

```plaintext
QueueApp/
├── apps/
│   ├── backend/            # Backend service
│   │   ├── src/            # Source code for the backend
│   │   │   ├── api/        # API routes
│   │   │   ├── db/         # MongoDB schema and connection logic
│   │   │   ├── services/   # OpenAI API integration
│   │   │   ├── workers/    # Worker logic for computation tasks
│   │   │   └── app.ts      # Application entry point
│   │   └── package.json    # Backend dependencies
│   ├── frontend/           # Frontend service
│   │   ├── src/            # Source code for the frontend
│   │   │   ├── app/        # Pages and components
│   │   │   ├── components/ # Components
│   │   │   ├── hooks/      # Custom React hooks
│   │   │   ├── styles/     # CSS and animations
│   │   │   └── tests/      # Frontend tests
│   │   └── package.json    # Frontend dependencies
│   └── packages/           # Shared packages (if applicable)
├── docker-compose.yml      # Docker Compose configuration
├── deploy.sh               # Script for deployment and management
├── linux_install.sh        # Script for installing Docker
├── README.md               # Documentation
└── turbo.json/             # turbo configuration
```

---

## **Getting Started**

### **Prerequisites**

1. **Install Docker and Docker Compose**:
   - Use the `linux_install.sh` script to install Docker and Docker Compose if not already installed.
   - Alternatively, run `deploy.sh` for automatic setup.

2. **Set Environment Variables**:
   Create a `.env` file in the `backend/` directory with the following keys:
   ```plaintext
   OPENAI_API_KEY=<your_openai_api_key>
   MONGO_URI=<your_mongo_db_uri>
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```
   Create a `.env` file in the `frontend/` directory with the following keys:
   ```plaintext
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

---

### **Running Locally**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd QueueApp
   ```

2. **Run Deployment Script**:
   ```bash
   ./deploy.sh
   ```

3. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:3001/api`

---

## **API Documentation**

### **1. Compute Job**

**Endpoint**: `POST /api/compute`  
**Description**: Adds a new computation job to the queue.

**Request Body**:
```json
{
  "a": 5,
  "b": 3
}
```

**Response**:
```json
{
  "jobId": "64e62a5432fc3"
}
```

---

### **2. Job Progress**

**Endpoint**: `GET /api/progress/:jobId`  
**Description**: Retrieves the progress and results of a specific computation job.

**Response**:
```json
{
  "progress": 100,
  "results": [
    { "operation": "Addition", "result": "8" },
    { "operation": "Subtraction", "result": "2" },
    { "operation": "Multiplication", "result": "15" },
    { "operation": "Division", "result": "1.67" }
  ]
}
```

---

## **Backend Code Overview**

### **MongoDB Connection (`db/connection.ts`)**

```typescript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connects to MongoDB.
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
 * Disconnects from MongoDB.
 */
export const disconnectFromDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Failed to disconnect from MongoDB', err);
  }
};
```

---

### **MongoDB Schema (`db/schema.ts`)**

```typescript
import mongoose from 'mongoose';

/**
 * Mongoose schema for a job.
 */
interface JobDocument extends mongoose.Document {
  a: number;
  b: number;
  results: { operation: string; result: string }[];
  progress: number;
}

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

export const Job = mongoose.model<JobDocument>('Job', jobSchema);
```

---

### **TypeScript Types for API (`types/express.ts`)**

```typescript
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

/**
 * Extends the Express Request object with a typed body.
 */
export interface TypedRequestBody<T> extends Request {
  body: T;
}

/**
 * Extends the Express Request object with typed params.
 */
export interface TypedRequestParams<T extends ParamsDictionary> extends Request {
  params: T;
}

/**
 * Request body for the `/api/compute` endpoint.
 */
export interface ComputeBody {
  a: number;
  b: number;
}

/**
 * Response type for the `/api/compute` endpoint.
 */
export type ComputeResponse = { jobId: string };

/**
 * Params for the `/api/progress/:jobId` endpoint.
 */
export interface JobParams extends ParamsDictionary {
  jobId: string;
}
```

---

## **Testing**

### **Frontend Tests**
*Don't forget .env.test*
Run tests using React Testing Library and Jest:
```bash
cd apps/frontend
npm run test
```

### **Backend Tests**
Run tests for backend logic using Mocha and Chai:
```bash
cd apps/backend
npm run test
```

---

## **Known Limitations**

- **Division by Zero**: Division by zero results in `"NaN"`.
- **OpenAI Dependency**: The app depends on OpenAI API for computation. This can be replaced with local computation logic if needed.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

