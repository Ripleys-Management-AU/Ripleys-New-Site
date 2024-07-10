import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { SelectionValueType } from "@/types/Form";

interface InputProps {
  name: any;
  control: any;
  rules: any;
  label: string;
  error?: any;
  required?: boolean;
  disabled: boolean;
  values: SelectionValueType[];
}

const animatedComponents = makeAnimated();

const FormSearchAndMultiSelect: React.FC<InputProps> = ({
  name,
  control,
  rules,
  label,
  error,
  required,
  disabled,
  values,
}) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      // border: "1px solid #ced4da",
      // borderRadius: "8px",
      // padding: "8px",
      // backgroundColor: "white",
      "min-height": "48px",
    }),
    menu: (provided: any) => ({
      ...provided,
      color: "black", // 设置下拉菜单的字体颜色
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#e0e0e0",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#000",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#000",
      ":hover": {
        backgroundColor: "#c0c0c0",
        color: "black",
      },
    }),
  };

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
        <Controller
          name={name}
          control={control}
          rules={rules}
          disabled={disabled}
          render={({ field }) => {
            const { onChange, onBlur, value } = field;
            return (
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={(val) => onChange(val.map((c: any) => c.value))}
                isMulti
                options={values}
                styles={customStyles}
              />
            );
          }}
        />
      </div>
      {error && (
        <span className="text-error font-semibold mt-1 text-sm">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormSearchAndMultiSelect;
