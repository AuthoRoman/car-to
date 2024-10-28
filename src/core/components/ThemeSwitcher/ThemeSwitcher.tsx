import { Button, Menu, MenuItem } from "@mui/material";

import React, { useContext, useRef, useState } from "react";

import { IThemeContext, IThemeMode } from "../../contexts/ThemeContext/types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import SunIcon from "../../Icons/SunIcon";
import MoonIcon from "../../Icons/MoonIcon";

const ThemeSwitcher: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { themeMode, switchTheme, isMobile } = useContext(
    ThemeContext,
  ) as IThemeContext;

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

  const { t } = useTranslation("translation", { keyPrefix: "theme" });

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpenMenu}
        //TODO: add case in system mode
        startIcon={themeMode === IThemeMode.LIGHT ? <SunIcon /> : <MoonIcon />}
        sx={{
          width: isMobile ? "100%" : "200px",
          backgroundColor: "var(--default-color-button)",
          borderRadius: isMobile
            ? "var(--circle-border-radius)"
            : "var(--default-border-radius)",
          color: "pallete.text.primary",
          "&:hover": { backgroundColor: "var(--default-color-button-hover)" },
        }}
        ref={buttonRef}
        children={
          !isMobile && (themeMode === IThemeMode.LIGHT ? t("light") : t("dark"))
        }
      ></Button>
      <Menu
        open={openMenu}
        anchorEl={buttonRef.current}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => handleSwitchTheme(IThemeMode.LIGHT)}
          selected={themeMode === IThemeMode.LIGHT}
        >
          {t("light")}
        </MenuItem>
        <MenuItem
          onClick={() => handleSwitchTheme(IThemeMode.DARK)}
          selected={themeMode === IThemeMode.DARK}
        >
          {t("dark")}
        </MenuItem>

        {
          //TODO: add case in system mode
          /* <MenuItem
          onClick={() => handleSwitchTheme(IThemeMode.SYSTEM)}
          selected={themeMode === IThemeMode.SYSTEM}
        >
          {t("system")}
        </MenuItem> */
        }
      </Menu>
    </div>
  );
};

export default ThemeSwitcher;
