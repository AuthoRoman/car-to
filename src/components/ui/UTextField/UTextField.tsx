import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import React, { memo } from "react";

export interface UTextFieldProps {
  value: string | number;
  textLabel: string;
  type?: string;
  error?: boolean;
  helperText?: string;
  maxLength?: string;
  require?: boolean;

  multiline?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UTextField: React.FC<UTextFieldProps> = memo(
  ({
    onChange,
    value,
    textLabel,
    error,
    type,
    helperText,
    maxLength,
    require,
    multiline,
  }) => {
    return (
      <>
        {textLabel === "Телефон*" ? (
          <MuiTelInput
            inputProps={{ maxLength: 16 }}
            size="small"
            value={value as string}
            onChange={onChange as () => string}
            sx={{
              backgroundColor: "white",
            }}
            error={error}
            helperText={helperText}
            label="Телефон*"
            color="primary"
          />
        ) : (
          <TextField
            required={require}
            size="small"
            value={value}
            error={error}
            inputProps={{ type: type, maxLength: maxLength }}
            onChange={onChange}
            helperText={helperText}
            sx={{
              borderRadius: "5px",
              backgroundColor: "white",
            }}
            label={textLabel}
            multiline={multiline}
            rows={multiline ? 4 : 1}
            id={multiline ? "standard-multiline-static" : ""}
          />
        )}
      </>
    );
  },
);

export default UTextField;
