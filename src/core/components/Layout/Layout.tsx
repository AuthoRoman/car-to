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
        justifyContent: "end",
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

          width: { xs: open ? "400px" : "200px", lg: "100%" },
          justifyContent: "end",
        }}
      >
        <MainDrawer open={open} setOpen={setOpen}>
          <Tabs
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "55px",
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
              display: "flex",
              gap: "15px",
              justifyContent: !isMobile ? "center" : "",
              flexDirection: isMobile ? "column" : "row",
              width: !isMobile ? 500 : "100%",
              marginRight: "110px",
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
            </FormControl>
            <ThemeSwitcher />
          </Box>
        </MainDrawer>
      </Box>
      <main style={{ width: "100%" }}>{children}</main>
    </Box>
  );
};
export default Layout;
