import React from 'react'
import { cardService } from '../../../../state/types'

import styles from '../InfoServiceCar/InfoServiceCar.module.scss'

interface IInfoServiceCarProps{
  car:cardService, 
  closeInfoCar:()=>void
}

const InfoServiceCar:React.FC<IInfoServiceCarProps> = ({car,closeInfoCar}) => {
  return (
    <div>
      <div onClick={closeInfoCar!} className={styles.InfoWaitingPopup}>
        <div onClick={(e)=>e.stopPropagation()} className={styles.InfoWaitingForm}>
           
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "space-between",
              gap:'5px'
            }}
          >
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>
              Завод по сборке данного автомобиля.........................................
              </span>
              <span className ={styles.valueOfPoints}>
                {car.assemblyPlant}  
              </span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>Номер контрольный автомобиля...................................................</span>
              <span className ={styles.valueOfPoints}>{car.checkDigit}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>
              Автомобиль собран в стране............................................................ 
              </span> 
              <span className ={styles.valueOfPoints}>{car.country}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>
                Сирийный номер автомобиля.......................................................... 
              </span>
              <span className ={styles.valueOfPoints}>{car.serialNumber ?? 'Неизвестно'}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>Машина заявлена на обслуживание.............................................</span>
              <span className ={styles.valueOfPoints}>{car.date}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>
              Марка автомобиля.................................................................................
              </span> 
              <span className ={styles.valueOfPoints}>{car.manufacturer}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>
                ВИН номер автомобиля.......................................................................
              </span>
              <span className ={styles.valueOfPoints}>{car.VIN}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>
              Год выпуска авто..................................................................................... 
              </span>
              <span className ={styles.valueOfPoints}>{car.modelYear}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>
              Имя мастера, который ремонтирует авто..................................
              </span> 
              <span className ={styles.valueOfPoints}>{car.nameMaster}</span>
              
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>Атрибуты транспортного средства.................................................</span>
              <span className ={styles.valueOfPoints}>{car.vehicleAttributes}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>Проблемы автомобиля........................................................................</span>
              <span className ={styles.valueOfPoints}>
                {car.problems.length === 0
                  ? " Не отмечены, приехал на тех обслуживание"
                  : car.problems}
                   
              </span>
            </li>
           </ul>
           
        </div>
      </div>
    </div>
  )
}

export default InfoServiceCar
