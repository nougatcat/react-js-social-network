import React, {useState} from 'react';
import styles from './Paginator.module.css';
import cn from "classnames"; //Если не будет работать, установить @types/classnames
import arrowLeftLogo from '../../../assets/images/arrowLeftLogo.svg'
import arrowRightLogo from '../../../assets/images/arrowRightLogo.svg'
import { Button} from 'antd'

type PropsType = {
    totalItemsCount: number
    pageSize: number 
    currentPage: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage = 1, onPageChanged = () => {}, portionSize = 5}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1); //т.к. мы задали значение сразу, то сразу неявно типизировалось как number возвращает number
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div>
        <div className={styles.paginator}>
            {portionNumber > 1 &&
                <img className={styles.arrows} src={arrowLeftLogo} alt='Назад' onClick={() => { setPortionNumber(portionNumber - 1) }} />}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <div className={cn({ [styles.selectedPage]: currentPage === p }, styles.pageNumber)}
                        key={p}
                        onClick={(e) => {
                            onPageChanged(p);
                        }}>{p}</div>
                })}
            {portionCount > portionNumber &&
                <img className={styles.arrows} src={arrowRightLogo} alt='Далее' onClick={() => { setPortionNumber(portionNumber + 1) }} />}
        </div>
        <div>
            {portionNumber > 1 &&
                <Button style={{margin: '0 0 8px 8px'}} onClick={() => { setPortionNumber(1) }}>В начало</Button>}
            {portionCount > portionNumber &&
                <Button style={{margin: '0 0 8px 8px'}} onClick={() => { setPortionNumber(portionCount) }}>В конец</Button>}
        </div>
    </div>
}

export default Paginator;

//У Димыча есть тест этой компоненты, но он не работает на новой версии реакта. Можно переписать его под себя, если надо (Урок 93)