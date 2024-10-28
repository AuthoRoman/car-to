import { useLocation, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import styles from "./Layout.module.scss";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import useChangeLang from "./hooks/useChangeLang";
import { useTranslation } from "react-i18next";
import { useStyles } from "./MUIClasses";

import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import MainDrawer from "../Drawer/MainDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname;
  console.log(currentTab);
  const handlerChange = (e: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const { t } = useTranslation("translation");
  const { lang, handlerChangeLang } = useChangeLang();

  const classes = useStyles();

  const context = useContext(ThemeContext);

  if (!context) return null;
  const { isMobile } = context;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: { lg: "column", xs: "row" },
        transition: "var(--default-transition)",
        gap: "15px",
        width: "100%",
      }}
    >
      <Box
        className={styles.navLayuout}
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: "15px 15px",
          transition: "var(--default-transition)",
          width: { xs: open ? "400px" : "200px", lg: "100%" },
          margin: "0 auto",
        }}
      >
        <MainDrawer open={open} setOpen={setOpen}>
          <Tabs
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "55px",
              transition: "var(--default-transition)",

              width: {
                xs: open ? "280px" : "140px",
                md: open ? "280px" : "140px",
                lg: "100%",
              },
            }}
            orientation={isMobile ? "vertical" : "horizontal"}
            value={currentTab}
            onChange={handlerChange}
            className={classes.tabs}
            aria-label="secondary tabs example"
            centered
          >
            <Tab
              sx={{
                fontSize: {
                  xxs: "8px",
                  xs: "9px",
                  sm: "9px",
                  md: "10px",
                  lg: "12px",
                  xl: "14px",
                },
              }}
              label={`${t("layout.inWaiting")}`}
              value="/car-to"
            />
            <Tab
              sx={{
                fontSize: {
                  xxs: "8px",
                  xs: "9px",
                  sm: "9px",
                  md: "10px",
                  lg: "12px",
                  xl: "14px",
                },
              }}
              label={`${t("layout.inService")}`}
              value="/inwork"
            />
            <Tab
              sx={{
                fontSize: {
                  xxs: "8px",
                  xs: "9px",
                  sm: "9px",
                  md: "10px",
                  lg: "12px",
                  xl: "14px",
                },
              }}
              label={`${t("layout.inFinish")}`}
              value="/finish"
            />
          </Tabs>
          <Box
            sx={{
              display: isMobile ? "flex" : "none",
              gap: "25px",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <FormControl
              size="small"
              fullWidth
              sx={{ width: open ? "200px" : "100px", margin: "0 auto" }}
            >
              <InputLabel id="demo-select-small-label">
                {t("language")}
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={lang}
                label={t("language")}
                onChange={(e) =>
                  handlerChangeLang(e.target.value as "ru" | "en")
                }
              >
                <MenuItem value={"ru"}>RU</MenuItem>
                <MenuItem value={"en"}>EN</MenuItem>
              </Select>
            </FormControl>{" "}
            <ThemeSwitcher />
          </Box>
        </MainDrawer>
        <Box
          sx={{
            minWidth: 310,
            gap: "5px 5px",
            justifyContent: "flex-end",
            display: "flex",
            right: "120px",
            top: "10px",
            padding: "0px",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Box sx={{ display: isMobile ? "none" : "flex", gap: "25px 25px" }}>
            <ThemeSwitcher />
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-select-small-label">
                {t("language")}
              </InputLabel>
              <Select
                sx={{ width: "100px" }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={lang}
                label={t("language")}
                onChange={(e) =>
                  handlerChangeLang(e.target.value as "ru" | "en")
                }
              >
                <MenuItem value={"ru"}>RU</MenuItem>
                <MenuItem value={"en"}>EN</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <main style={{ width: "100%" }}>{children}</main>
    </Box>
  );
};
export default Layout;
