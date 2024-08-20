import { Button } from "@mui/material";
import React from "react";

interface ButtonPlusProps {
  onClick: () => void;
  height?: string;
}

const ButtonPlus: React.FC<ButtonPlusProps> = ({ onClick, height }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: "var(--default-color-button)",
        height: height ?? "45px",
        transition: "var(--default-transition)",
        "&:hover": {
          background: "var(--default-color-button-hover)",
        },
      }}
      variant="contained"
    >
      +
    </Button>
  );
};

export default ButtonPlus;
