import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import { Tab, Tabs } from "@mui/material";

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <nav className={styles.navLayuout} style={{ margin: "0 auto" }}>
        <Tabs
          sx={{
            margin: "0 auto",
            display: "inline-block",
            width: { xs: "630px", md: " 881px" },
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
            label=" Машины, которые прошли обслуживание"
            value="/finish"
          />
        </Tabs>
      </nav>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
