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
import ThemeSwitcher from "../../core/components/ThemeSwitcher";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname;
  console.log(currentTab);
  const handlerChange = (e: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const { t } = useTranslation("translation");
  const { lang, handlerChangeLang } = useChangeLang();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
      }}
    >
      <nav
        className={styles.navLayuout}
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "15px 15px",
          width: "100%",
        }}
      >
        <Tabs
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "630px", md: "881px", lg: "100%" },
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
          <ThemeSwitcher />
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
