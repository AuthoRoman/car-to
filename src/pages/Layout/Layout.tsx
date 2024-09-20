import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname;

  const handlerChange = (e: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const { t } = useTranslation();
  const { lang, handlerChangeLang } = useChangeLang();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <nav
        className={styles.navLayuout}
        style={{
          display: "flex",
          alignItems: "baseline",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Tabs
          sx={{
            display: "flex",

            width: { xs: "630px", md: "881px", lg: "fit-content" },
          }}
          value={currentTab}
          onChange={handlerChange}
          indicatorColor="primary"
          textColor="primary"
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
            label=" Очередь на обслуживание"
            value="/car-to/"
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
            label=" Машины обслуживаются"
            value="/car-to/inwork"
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
            label=" Машины, которые прошли обслуживание"
            value="/car-to/finish"
          />
        </Tabs>

        <Box
          sx={{
            minWidth: 90,
            justifyContent: "flex-end",
            height: "10px",
            alignItems: "center",
          }}
        >
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-select-small-label">
              {t("language")}
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={lang}
              label={t("language")}
              onChange={(e) => handlerChangeLang(e.target.value as "ru" | "en")}
            >
              <MenuItem value={"ru"}>RU</MenuItem>
              <MenuItem value={"en"}>EN</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </nav>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
