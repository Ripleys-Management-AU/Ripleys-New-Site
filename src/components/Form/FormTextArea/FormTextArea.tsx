import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  register: UseFormRegisterReturn;
  error?: any;
  required?: boolean;
  disabled: boolean;
}

const FormTextArea: React.FC<Props> = ({
  label,
  register,
  error,
  required,
  disabled,
}) => {
  return (
    <div className="w-full mt-2">
      <div className="label">
        <span
          className={`label-text font-semibold ${error ? "text-error" : "text-neutral-content"}`}
        >
          {label}
          {required && `*`}
        </span>
      </div>
      <div className="w-full">
        <textarea
          className={`textarea bg-white text-black w-full min-h-[100px] text-md ${error ? "textarea-error" : ""}`}
          disabled={disabled}
          {...register}
        />
        {error && (
          <span className="text-error font-semibold text-sm">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormTextArea;
