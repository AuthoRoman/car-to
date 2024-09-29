import React from "react";
import NoCarImage from "../../../assets/images/carNo.png";
import styles from "./NoCarList.module.scss";
import { useTranslation } from "react-i18next";

interface INoCarListProps {
  text: string;
}

const NoCarList: React.FC<INoCarListProps> = ({ text }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.NoCarList__body}>
        <img className={styles.NoCarList__bodyImg} src={NoCarImage} alt="" />
        <span className={styles.text__underImage}>
          {text ?? t("noCarQueue")}
        </span>
      </div>
    </div>
  );
};

export default NoCarList;
