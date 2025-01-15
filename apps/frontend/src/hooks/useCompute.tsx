import { useState, useCallback } from "react";
import type { ProgressResponse, UseComputeReturn } from "../types/compute";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const OPERATIONS = [
    { operation: "Addition", symbol: "+" },
    { operation: "Subtraction", symbol: "-" },
    { operation: "Multiplication", symbol: "*" },
    { operation: "Division", symbol: "/" },
];

/**
 * Custom hook for handling computations in the Queue App.
 * - Manages state for inputs (`a` and `b`), progress, tasks, errors, and results.
 * - Fetches computation results and updates progress dynamically.
 * @returns Hook state and functions for managing computation.
 */
export const useCompute = (): UseComputeReturn => {
    const [a, setA] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [, setResults] = useState<ProgressResponse["results"]>([]);
    const [currentTasks, setCurrentTasks] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
    * Handles the computation process.
    * - Sends inputs to the backend.
    * - Monitors progress and updates tasks dynamically.
    */
    const handleCompute = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError(null);
        setProgress(0);
        setResults([]);
        setCurrentTasks(
            OPERATIONS.map(({ symbol }) => `${a} ${symbol} ${b} = Computing...`)
        );

        try {
            const response = await fetch(`${API_URL}/api/compute`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ a, b }),
            });

            if (!response.ok) {
                throw new Error("Failed to start computation.");
            }

            const { jobId } = (await response.json()) as { jobId: string };

            const pollProgress = async (): Promise<void> => {
                try {
                    const progressResponse = await fetch(`${API_URL}/api/progress/${jobId}`);
                    const data = (await progressResponse.json()) as ProgressResponse;

                    setProgress(data.progress);

                    setResults((prevResults) => {
                        const newResults = data.results.filter(
                            (result) => !prevResults.some((r) => r.operation === result.operation)
                        );

                        setCurrentTasks(
                            OPERATIONS.map(({ operation, symbol }) => {
                                const existingResult = [...prevResults, ...newResults].find(
                                    (r) => r.operation === operation
                                );

                                return existingResult
                                    ? `${a} ${symbol} ${b} = ${existingResult.result}`
                                    : `${a} ${symbol} ${b} = Computing...`;
                            })
                        );

                        return [...prevResults, ...newResults];
                    });

                    if (data.progress >= 100) {
                        clearInterval(intervalId);
                        setIsLoading(false);
                    }
                } catch (fetchError) {
                    clearInterval(intervalId);
                    setError("Failed to fetch progress. Please try again.");
                    setIsLoading(false);
                }
            };

            const intervalId = setInterval(() => {
                void pollProgress();
            }, 1000);

        } catch (computeError) {
            setError(computeError instanceof Error ? computeError.message : "Unknown error.");
            setIsLoading(false);
        }
    }, [a, b]);

    return { a, b, setA, setB, progress, currentTasks, isLoading, error, handleCompute };
};
