import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../src/app/page";
import { describe, it, expect } from "@jest/globals";
import '@testing-library/jest-dom';

describe("Home Page Tests", () => {
  it("should render input fields and compute button", () => {
    render(<Page />);
    expect(screen.getByPlaceholderText("Enter A")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter B")).toBeInTheDocument();
    expect(screen.getByText("Compute")).toBeInTheDocument();
  });

  it("should update input values", () => {
    render(<Page />);

    const inputA = screen.getByPlaceholderText("Enter A");
    const inputB = screen.getByPlaceholderText("Enter B");

    fireEvent.change(inputA, { target: { value: "10" } });
    fireEvent.change(inputB, { target: { value: "20" } });

    expect(inputA).toHaveValue(10);
    expect(inputB).toHaveValue(20);
  });

  it("should display progress when Compute is clicked", async () => {
    render(<Page />);

    const inputA = screen.getByPlaceholderText("Enter A");
    const inputB = screen.getByPlaceholderText("Enter B");
    const button = screen.getByText("Compute");

    fireEvent.change(inputA, { target: { value: "10" } });
    fireEvent.change(inputB, { target: { value: "20" } });
    fireEvent.click(button);

    const computingElements = await screen.findAllByText(/Computing.../);
    expect(computingElements).toHaveLength(4);
  });
});
