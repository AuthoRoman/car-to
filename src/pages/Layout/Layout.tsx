import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { Tab, Tabs } from "@mui/material";

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const location = useLocation();

  const currentTab = location.pathname;

  const handlerChange = (e: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <div>
      <nav >
        <Tabs
        sx={{overflowX:{xs:'scroll', sm: 'hidden' },  }}
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
