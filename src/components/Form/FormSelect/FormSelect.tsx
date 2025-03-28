import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { SelectionValueType } from "@/types/Form";

interface InputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: any;
  required?: boolean;
  disabled: boolean;
  values: SelectionValueType[];
}

const FormSelect: React.FC<InputProps> = ({
  label,
  register,
  error,
  required,
  disabled,
  values,
}) => {
  return (
    <div className="w-full">
      <div className="label">
        <span
          className={`label-text font-semibold ${error ? "text-error" : "text-neutral-content"}`}
        >
          {label}
          {required && "*"}
        </span>
      </div>
      <div className="w-full flex flex-col">
        <select
          className={`select select-info bg-white text-black ${error ? "select-error" : ""}`}
          disabled={disabled}
          {...register}
        >
          {values.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-error font-semibold mt-1 text-sm">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormSelect;
