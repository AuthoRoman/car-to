import React from 'react'
import NoCarImage from '../../assets/images/carNo.png'
import styles from './NoCarList.module.css'    

interface INoCarListProps {
text:String
}

const NoCarList:React.FC<INoCarListProps> = ({text}) => {
  return (
    <div>
        <div className={styles.NoCarList__body}>
            
            <img className={styles.NoCarList__bodyImg} src={NoCarImage} alt="" />
            <span className={styles.text__underImage}>{text ?? 'Машин нет в очереди'}</span>
        </div>
      
    </div>
  )
}

export default NoCarList
