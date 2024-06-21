import React from 'react';
import { IProblems, IPropsCar } from '../../../state/types';
import style from './CarComponent.module.css'

const CarComponent:React.FC<IPropsCar> = (props) => {
    return (
         
            <div className={style.carBoard}>
                <div className= {style.carBoard__header} >{ props.nameOwner}</div>
                <div className= {style.carBoard__tel} >{props.tel}</div>
                <div className={style.carBoard__inner}>
                    {Object.keys(props.problems ).map(probllemId =>(
                        <div className={style.carBoard__inner__item} key={probllemId}>
                            {probllemId + `:` + ( props.problems as any)[probllemId] }
                        </div>
                    ))}
                </div>
            </div>
         
    );
}

export default CarComponent;
