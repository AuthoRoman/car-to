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
        backgroundColor: "#705AF8",
        height: height ?? `45px`,
        transition: "all .8s",
        "&:hover": {
          background: "#7975F8",
        },
      }}
      variant="contained"
    >
      +
    </Button>
  );
};

export default ButtonPlus;
