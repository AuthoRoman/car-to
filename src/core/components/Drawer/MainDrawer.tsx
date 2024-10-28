import styled from "@emotion/styled";
import { Box, Divider, Drawer } from "@mui/material";
import React, { PropsWithChildren, useContext } from "react";
import ArrowRight from "../../Icons/ArrowRight";
import { ThemeContext } from "../../contexts/ThemeContext";
import { IThemeContext, IThemeMode } from "../../contexts/ThemeContext/types";

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",

  // necessary for content to be below app bar

  justifyContent: "flex-end",
}));

interface MainDrawerProps extends PropsWithChildren {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainDrawer: React.FC<MainDrawerProps> = ({ children, open, setOpen }) => {
  const { themeMode, isMobile } = useContext(ThemeContext) as IThemeContext;

  if (!isMobile) return <>{children}</>;
  return (
    <Drawer
      sx={{
        position: "relative",
        display: { xs: "block", lg: "none" },
        width: open ? "281px" : "141px",

        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? "281px" : "141px",
          transition: "var(--default-transition)",
          boxSizing: "border-box",
          scrollbarWidth: "none",
        },
      }}
      variant="permanent"
      anchor={"left"}
      open={false}
    >
      <DrawerHeader style={{ position: "absolute", right: "5px", top: "5px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "5px 0",
            transition: "var(--default-transition)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            "&  :hover": { cursor: "pointer" },
          }}
        >
          <ArrowRight
            fill={themeMode === IThemeMode.DARK ? "white" : "black"}
            onClick={() => setOpen(!open)}
          />
        </Box>
      </DrawerHeader>
      <Divider />
      {children}
    </Drawer>
  );
};

export default MainDrawer;
