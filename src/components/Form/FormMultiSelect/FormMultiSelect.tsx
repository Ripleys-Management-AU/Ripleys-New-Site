import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { SelectionValueType } from "@/types/Form";

interface InputProps {
  name: any;
  control: UseFormReturn["control"];
  rules: any;
  label: string;
  error?: any;
  required?: boolean;
  disabled: boolean;
  values: SelectionValueType[];
}
const FormMultiSelect: React.FC<InputProps> = ({
  name,
  control,
  rules,
  label,
  error,
  required,
  disabled,
  values,
}) => {
  const [isOpen, setOpen] = useState(false);

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
                multiple
                value={value || []}
                onChange={onChange}
                onBlur={(event) => {
                  onBlur();
                  setOpen(false);
                }}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={isOpen}
                displayEmpty
                sx={{
                  width: "100%",
                  border: "1px solid #ced4da",
                  borderRadius: "8px",
                  padding: "8px",
                  backgroundColor: "white",
                  height: "48px",
                }}
                renderValue={(selected) => {
                  if (!selected.length) {
                    return <em className="text-gray-500">Select {label}</em>;
                  }
                  return selected
                    .map(
                      (val: any) => values.find((v) => v.value === val)?.label,
                    )
                    .join(", ");
                }}
              >
                {values.map((option) => {
                  if (!value) return;
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox
                        checked={(value as any).indexOf(option.value) > -1}
                      />
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  );
                })}
              </Select>
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

export default FormMultiSelect;
