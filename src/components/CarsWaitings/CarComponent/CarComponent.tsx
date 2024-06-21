import React from "react";
import { IProblems, IPropsCar } from "../../../state/types";
import style from "./CarComponent.module.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CloseIcon from "@mui/icons-material/Close";
const CarComponent: React.FC<IPropsCar> = (props) => {
  return (
    <div className={style.carBoard}>
      <div className={style.carBoard__header}>{props.nameOwner}</div>
      <div className={style.carBoard__tel}>{props.tel}</div>
      <div className={style.carBoard__inner}>
        {Object.keys(props.problems).map((probllemId) => (
          <div className={style.carBoard__inner__item} key={probllemId}>
            {probllemId}:{" "}
            {Boolean((props.problems as any)[probllemId]) ? (
              <CloseIcon color="error" />
            ) : (
              <TaskAltIcon color="success" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarComponent;
