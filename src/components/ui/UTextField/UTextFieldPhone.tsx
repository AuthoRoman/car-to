import { MuiTelInput } from "mui-tel-input";
import React from "react";
import { UTextFieldProps } from "./UTextField";

const UTextFieldPhone: React.FC<UTextFieldProps> = ({
  onChange,
  value,
  require,
  error,
  textLabel,
  helperText,
}) => {
  return (
    <MuiTelInput
      inputProps={{ maxLength: 16 }}
      required={require}
      size="small"
      value={value as string}
      onChange={onChange as () => string}
      error={error}
      helperText={helperText}
      label={textLabel}
      color="primary"
    />
  );
};

export default UTextFieldPhone;
