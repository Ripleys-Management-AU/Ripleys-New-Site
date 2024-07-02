import { Datepicker } from "flowbite-react";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface Props {
  label: string;
  control: UseFormReturn["control"];
  name: any;
  error?: any;
  required?: boolean;
  disabled: boolean;
}

const FormDatepicker: React.FC<Props> = ({
  label,
  control,
  name,
  error,
  required,
  disabled,
}) => {
  const rules = { required: "Birth date is required" } as any;

  return (
    <div className="w-full">
      <div className="label">
        <span
          className={`label-text font-semibold ${
            error ? "text-error" : "text-neutral-content"
          }`}
        >
          {label}
          {required && "*"}
        </span>
      </div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <div className="w-full text-black">
              <Datepicker
                onSelectedDateChanged={onChange}
                style={{ height: "48px !important" }}
                sizing={"md"}
              />
            </div>
          );
        }}
      />
      {error && (
        <span className="text-error font-semibold mt-1 text-sm">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormDatepicker;
