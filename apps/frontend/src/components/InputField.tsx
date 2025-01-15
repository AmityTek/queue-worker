import React from "react";
import type { ChangeEvent } from "react";
import "../styles/globals.css";
import "../styles/animations.css";


/**
 * Props for the InputField component.
 * - `value`: The current numeric value of the input field.
 * - `placeholder`: Placeholder text to display in the input field.
 * - `onChange`: Function to handle input changes and update the value.
 */
interface InputFieldProps {
  value: number;
  placeholder: string;
  onChange: (value: number) => void;
}

/**
 * A reusable numeric input field component.
 * - Allows users to input a number.
 * - Triggers the `onChange` callback whenever the value changes.
 */
function InputField({ value, placeholder, onChange }: InputFieldProps): JSX.Element {
  return (
    <input
      className="border border-gray-300 p-3 rounded-lg w-50 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      onChange={(e: ChangeEvent<HTMLInputElement>) => { onChange(Number(e.target.value)) }}
      placeholder={placeholder}
      type="number"
      value={value}
    />
  );
};

export default InputField;
