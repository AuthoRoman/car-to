import React from 'react'
import { cardFinish, ICar } from '../../../../state/types'
import styles from './InfoFinnishCar.module.css'

const InfoFinishCar:React.FC<{car:cardFinish, closeInfoCar:any}> = ({car,closeInfoCar}) => {
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
              <span className ={styles.titlePoints}>Машина  прошла обслуживание......................................................</span>
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
              Имя мастера, который отремонтировал авто...........................
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
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>Работы, которые были проведены................................................</span>
              <span className ={styles.valueOfPoints}>{car.workOncar}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className ={styles.titlePoints}>Рекомендации..........................................................................................</span>
              <span className ={styles.valueOfPoints}>{car.recomm}</span>
            </li>
           </ul>
           
           
        </div>
      </div>
    </div>
  )
}

export default InfoFinishCar
