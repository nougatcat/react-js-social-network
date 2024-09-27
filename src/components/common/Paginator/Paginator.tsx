import React, {useState} from 'react';
import styles from './Paginator.module.css';
import cn from "classnames"; //Если не будет работать, установить @types/classnames

type PropsType = {
    totalItemsCount: number
    pageSize: number 
    currentPage: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage = 1, onPageChanged = () => {}, portionSize = 10}) => {

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
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>Назад</button>}
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
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Далее</button>}
        </div>
        <div>
            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(1) }}>В начало</button>}
            {portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionCount) }}>В конец</button>}
        </div>
    </div>
}

export default Paginator;

//У Димыча есть тест этой компоненты, но он не работает на новой версии реакта. Можно переписать его под себя, если надо (Урок 93)