import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface IProps extends ButtonProps {
  text: string;
}

const UButton: React.FC<IProps> = ({ text, sx = {}, ...props }) => {
  return (
    <Button
      sx={[
        {
          backgroundColor: "var(--default-color-button)",
          transition: "var(--default-transition)",
          "&:hover": {
            background: "var(--default-color-button-hover)",
          },
        },
        sx as object,
      ]}
      variant="contained"
      {...props}
    >
      {text}
    </Button>
  );
};

export default UButton;
