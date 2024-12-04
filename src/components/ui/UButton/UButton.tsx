import React from "react";
import { Button } from "@mui/material";

interface IProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const UButton: React.FC<IProps> = ({ text, onClick, ...props }) => {
  return (
    <Button
      sx={{
        backgroundColor: "var(--default-color-button)",
        transition: "var(--default-transition)",
        "&:hover": {
          background: "var(--default-color-button-hover)",
        },
      }}
      variant="contained"
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
};

export default UButton;
