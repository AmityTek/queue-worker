/**
 * Interface representing the response from the backend API for job progress.
 * - `progress`: The progress percentage (0-100) of the computation.
 * - `results`: An array of results for each mathematical operation.
 *   - `operation`: The name of the operation (e.g., "Addition").
 *   - `result`: The result of the operation.
 */
interface ProgressResponse {
    progress: number;
    results: { operation: string; result: string }[];
}

/**
 * Interface representing the return values and functions of the `useCompute` hook.
 * - `a`: First input value for the computation.
 * - `b`: Second input value for the computation.
 * - `setA`, `setB`: Functions to update the input values.
 * - `progress`: Progress percentage of the computation.
 * - `currentTasks`: An array of strings showing the current status of each task.
 * - `isLoading`: Boolean indicating if the computation is in progress.
 * - `error`: Error message string if an error occurs, otherwise `null`.
 * - `handleCompute`: Function to start the computation process.
 */
export interface UseComputeReturn {
    a: number;
    b: number;
    setA: React.Dispatch<React.SetStateAction<number>>;
    setB: React.Dispatch<React.SetStateAction<number>>;
    progress: number;
    currentTasks: string[];
    isLoading: boolean;
    error: string | null;
    handleCompute: () => Promise<void>;
}