"use client";

import React from 'react';
import InputField from "../components/InputField";
import TasksList from "../components/TasksList";
import { useCompute } from "../hooks/useCompute";

/**
 * Main page component for the Queue App.
 * Handles user inputs and displays the results of computations.
 */
export default function Page(): JSX.Element {
  const { a, b, setA, setB, currentTasks, isLoading, error, handleCompute } = useCompute();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">Queue-based Computation App</h1>

      {error ? <p className="text-red-600 font-medium">{error}</p> : null}

      <div className="flex gap-4 mb-6">
        <InputField onChange={setA} placeholder="Enter A" value={a} />
        <InputField onChange={setB} placeholder="Enter B" value={b} />
        <button
          className={`px-6 py-3 rounded-lg text-white font-semibold ${isLoading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
            }`}
          disabled={isLoading}
          onClick={() => void handleCompute()}
          type="button"
        >
          Compute
        </button>
      </div>

      {currentTasks.length > 0 && <TasksList tasks={currentTasks} />}
    </main>
  );
}
