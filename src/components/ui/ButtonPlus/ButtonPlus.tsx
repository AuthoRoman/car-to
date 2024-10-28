import { Button } from "@mui/material";
import React from "react";

interface ButtonPlusProps
  extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  onClick: () => void;
  height?: string;
}

const ButtonPlus: React.FC<ButtonPlusProps> = ({
  onClick,
  height,
  ...props
}) => {
  console.log(height);
  return (
    <Button
      onClick={onClick}
      {...props}
      sx={{
        backgroundColor: "var(--default-color-button)",
        height: height ?? "var(--buttonplus-height-withcar)",
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
