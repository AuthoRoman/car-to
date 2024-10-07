import { Button, Menu, MenuItem } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import React, { useContext, useRef, useState } from "react";

import { IThemeContext, IThemeMode } from "../contexts/ThemeContext/types";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { themeMode, switchTheme } = useContext(ThemeContext) as IThemeContext;

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleSwitchTheme = (mode: IThemeMode) => {
    switchTheme(mode);
    handleCloseMenu();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpenMenu}
        startIcon={<PaletteIcon />}
        ref={buttonRef}
      >
        Theme
      </Button>
      <Menu
        open={openMenu}
        anchorEl={buttonRef.current}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => handleSwitchTheme(IThemeMode.LIGHT)}
          selected={themeMode === IThemeMode.LIGHT}
        >
          Light
        </MenuItem>
        <MenuItem
          onClick={() => handleSwitchTheme(IThemeMode.DARK)}
          selected={themeMode === IThemeMode.DARK}
        >
          Dark
        </MenuItem>
        <MenuItem
          onClick={() => handleSwitchTheme(IThemeMode.SYSTEM)}
          selected={themeMode === IThemeMode.SYSTEM}
        >
          System
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ThemeSwitcher;
