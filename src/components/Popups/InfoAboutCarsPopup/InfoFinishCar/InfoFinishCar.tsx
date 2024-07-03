import React from 'react'
import { cardFinish, ICar } from '../../../../state/types'
import styles from './InfoFinnishCar.module.css'

const InfoFinishCar:React.FC<{car:cardFinish, closeInfoCar:any}> = ({car,closeInfoCar}) => {
  return (
    <div>
      <div onClick={closeInfoCar!} className={styles.InfoWaitingPopup}>
        <div onClick={(e)=>e.stopPropagation()} className={styles.InfoWaitingForm}>
          <ul>
            <li>id автомобиля{car.id}  </li>
            <li>Завод по сборке данного автомобиля {car.assemblyPlant}</li>
            <li>Номер автомобиля {car.checkDigit}</li>
            <li>Автомобиль собран в стране {car.country}</li>
            <li>Машина заявлена на обслуживание - {car.date}</li>
            <li>Марка автомобиля{car.manufacturer}</li>
            <li>ВИН номер автомобиля{car.VIN}</li>
            <li>Год выпуска авто {car.modelYear}</li>
            <li>Имя мастера, который ремонтирует авто {car.nameMaster}</li>
            <li>Атрибуты транспортного средства {car.vehicleAttributes}</li>
            <li>Проблемы авто - {car.problems.length ===0 ? 'приехала на тех обслуживание' : car.problems}</li>
             
          </ul>
           
           
        </div>
      </div>
    </div>
  )
}

export default InfoFinishCar
