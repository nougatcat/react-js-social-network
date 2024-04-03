import React from 'react';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';


const Header = (props) => {
    return (
        <header className={css.header}>
            <img className={css.header__image} src='./logo192.png' alt="" />
            <div className={css.loginBlock}>
                {props.isAuth ? props.login
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;