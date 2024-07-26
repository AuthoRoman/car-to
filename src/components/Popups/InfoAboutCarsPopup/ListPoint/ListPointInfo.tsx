import React from "react";
import styles from './ListPointInfo.module.scss'
interface ListPointInfoPopup {
  title: string;
  text: string | number;
}

const ListPointInfo: React.FC<ListPointInfoPopup> = ({ title, text }) => {
  return (
    <li className={styles.InfoWaitingPopup__innerPoints}>
      <span className={styles.titlePoints}>
        {title}
      </span>
      <span className={styles.valueOfPoints}>
        {text}
      </span>
    </li>
  );
};

export default ListPointInfo;
