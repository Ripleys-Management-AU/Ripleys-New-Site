import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: any;
  required?: boolean;
  disabled: boolean;
}

const FormInput: React.FC<InputProps> = ({
  label,
  register,
  error,
  required,
  disabled,
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
        <input
          className={`input input-info bg-white text-black ${error ? "input-error" : ""}`}
          disabled={disabled}
          {...register}
        />
        {error && (
          <span className="text-error font-semibold mt-1 text-sm">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
