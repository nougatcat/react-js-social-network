import React from 'react';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';


const Header = (props) => {
    return (
        <header className={css.header}>
            <img className={css.header__image} src='./logo192.png' alt="" />
            <div className={css.loginBlock}>
                {props.isAuth 
                    ? <div>{props.login + ' ' + props.id} - <button onClick={props.logout}>Выйти</button></div>
                    : <NavLink to={'/login'}>Войти</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;