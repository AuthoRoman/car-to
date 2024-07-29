import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import React, { memo } from "react";

interface UTextFieldProps {
  value: string | number;
  textLabel: string;
  type?: string;
  error?: boolean;
  helperText?: string;
  maxLength?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void  ;
}

const UTextField: React.FC<UTextFieldProps> = memo(
  ({ onChange, value, textLabel, error, type, helperText,maxLength }) => {
    return (

        <>
          { textLabel === 'Телефон*' ?
           <MuiTelInput
           inputProps={{ maxLength: 16 }}
           size="small"
           value={value as string}
           onChange={onChange as ()=>string}
           sx={{
             backgroundColor: "white",
           }}
           error={error}
           helperText={  helperText  }
           label="Телефон*"
           color="primary"
         />
          
          :
      <TextField
        size="small"
        value={value}
        error={error}
        inputProps={{type:type, maxLength: maxLength}}
        onChange={onChange}
        helperText={helperText}
        sx={{
          borderRadius: "5px",
          backgroundColor: "white",
        }}
        label={textLabel}
        multiline = {textLabel ==="Ваша пролема" ? true: false}
        rows={textLabel ==="Ваша пролема" ? 4: 1}
        id={textLabel ==="Ваша пролема" ? "standard-multiline-static": ''}
      />
    
    }
        </>
      
    );
  }
);

export default UTextField;
