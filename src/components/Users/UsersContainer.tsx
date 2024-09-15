//Контейнерная компонента нужна для передачи в презентационную компоненту
//элементов стора и функций редюсера так, чтобы внутри презентационной компоненты
//не было зависимостей от реализации стора и редюсеров
//?Контейнерная компонента была здесь до урока 114, теперь используются хуки

import React from 'react';
import {  useSelector } from 'react-redux';
import { Users } from './Users.tsx';
import Preloader from '../common/Preloader/Preloader.tsx';
import { getIsFetching } from '../../redux/users-selectors.ts';

type UsersPagePropsType = {
    pageTitle: string //передано из App.js
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return (
        //<> - обертка для Users 
        <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    )
}
