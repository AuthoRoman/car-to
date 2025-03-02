import React from "react";
import UButton from "../UButton/UButton";

export const SmallPrimary = ({
  onClick,
  text,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}) => {
  return (
    <UButton
      sx={{ height: "40px", lineHeight: 1.2 }}
      onClick={onClick}
      text={text}
    />
  );
};
