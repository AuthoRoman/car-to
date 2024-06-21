import React from "react";
import { Link } from "react-router-dom";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link className={styles.navList__item} to="/">
            Очередь на обслуживание
          </Link>
        </li>
        <li>
          <Link className={styles.navList__item} to="/inwork">
            Машины обслуживаются
          </Link>
        </li>
        <li>
          <Link className={styles.navList__item} to="/finish">
            Машины, которые прошли обслуживание
          </Link>
        </li>
      </ul>
    </nav>
    <main>{children}</main>
  </div>
);

export default Layout;
