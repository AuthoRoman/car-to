import { TextField, useColorScheme } from "@mui/material";
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
      <TextField
        variant="outlined"
        required={require}
        size="small"
        value={value}
        error={error}
        inputProps={{ type: type, maxLength: maxLength }}
        onChange={onChange}
        helperText={helperText}
        sx={{
          color: "green",
          borderRadius: "5px",

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "palette.primary.main",
              color: "palette.primary.main",
            },
            "&:hover fieldset": {
              borderColor: "palette.primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "palette.primary.main",
            },
          },
        }}
        label={textLabel}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        id={multiline ? "standard-multiline-static" : ""}
      />
    );
  },
);

export default UTextField;
