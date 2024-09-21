import { NavLink } from 'react-router-dom';
import css from'./Navbar.module.css'
import React from 'react';

//let cssPlus = `${css.item} ${css.active}` //конкатенация строк с пробелом


const Navbar: React.FC = () => {
    return (
        <nav className={css.navigation}>
            <div>
                <NavLink to="/profile" className = { navData => navData.isActive ? css.active : css.item }>Профиль</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" className = { navData => navData.isActive ? css.active : css.item }>Сообщения</NavLink>
            </div>
            <div>
                <NavLink to="/chat" className = { navData => navData.isActive ? css.active : css.item }>Чатик</NavLink>
            </div>
            <div>
                <NavLink to="/users" className = { navData => navData.isActive ? css.active : css.item }>Юзеры</NavLink>
            </div> 
        </nav>
    )
}

export default Navbar;