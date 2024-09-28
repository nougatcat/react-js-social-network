import React from 'react';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuthSelector } from '../../redux/auth-selectors.ts';
import { AppDispatch } from '../../redux/redux-store';
import { logout } from "../../redux/auth-reducer.ts";
import { Button } from 'antd';
import reactLogo from '../../assets/images/reactLogo.png'


const Header: React.FC = () => {
    const isAuth = useSelector(getIsAuthSelector)
    // const login = useSelector(getLoginSelector)
    // const id = useSelector(getIdSelector)
    const dispatch: AppDispatch = useDispatch()
    const _logout = () => {
        dispatch(logout())
    }

    return (
        <header className={css.header}>
            <img className={css.header__image} src={reactLogo} alt="" />
            <div className={css.loginBlock}>
                {isAuth 
                    ? <Button onClick={_logout}>Выйти</Button>
                    : <Button><NavLink to={'/login'}>Войти</NavLink></Button>
                }
            </div>
        </header>
    )
}

export default Header;