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
  console.log(navigate);
  const location = useLocation();
  console.log(location);
  const currentTab = location.pathname;

  const handlerChange = (e: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <div>
      <nav>
        <Tabs
          value={currentTab}
          onChange={handlerChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="secondary tabs example"
          className={styles.navList }
          centered
        >
          <Tab
            label=" Очередь на обслуживание"
            /*className={styles.navList__item}*/ value="/car-to"
          />
          <Tab
            label=" Машины обслуживаются"
            /*className={styles.navList__item}*/ value="/inwork"
          />
          <Tab
            label=" Машины, которые прошли обслуживание"
            /*className={styles.navList__item}*/ value="/finish"
          />
        </Tabs>
      </nav>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
// <TabContext value={value}>
{
  /* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
<TabList onChange={handleChange} aria-label="lab API tabs example">
    <Tab label="Очередь на обслуживание" value="1" />
    <Tab label=" Машины обслуживаются" value="2" />
    <Tab label="Машины, которые прошли обслуживание" value="3" />
  </TabList>
</Box>

<TabPanel value="1">
  <Link className={styles.navList__item} to="/car-to">
    Очередь на обслуживание
  </Link>
</TabPanel>
<TabPanel value="2">
  <Link className={styles.navList__item} to="/inwork">
    Машины обслуживаются
  </Link>
</TabPanel>
<TabPanel value="3">
  <Link className={styles.navList__item} to="/finish">
    Машины, которые прошли обслуживание
  </Link>
</TabPanel>
</Box>
</TabContext> */
}
