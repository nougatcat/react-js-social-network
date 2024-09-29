import { NavLink } from 'react-router-dom';
import css from './Navbar.module.css'
import React from 'react';
import profileLogo from '../../assets/images/profileLogo.svg';
import chatLogo from '../../assets/images/chatLogo.svg';
import usersLogo from '../../assets/images/usersLogo.svg'

const Navbar: React.FC = () => {
    return (
        <nav className={css.navigation}>
            <div className={css.navigation_element}>
                <NavLink to="/profile" className={navData => navData.isActive ? css.active : css.item}>
                    <img style={{margin: "0 8px 0 8px"}} src={profileLogo} alt="" /><span>Профиль</span>
                </NavLink>
            </div>
            <div className={css.navigation_element}>
                <NavLink to="/chat" className={navData => navData.isActive ? css.active : css.item}>
                    <img style={{margin: "0 8px 0 8px"}} src={chatLogo} alt="" /><span>Чатик</span>
                </NavLink>
            </div>
            <div className={css.navigation_element}>
                <NavLink to="/users" className={navData => navData.isActive ? css.active : css.item}>
                    <img style={{margin: "0 8px 0 8px"}} src={usersLogo} alt="" /><span>Юзеры</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar;