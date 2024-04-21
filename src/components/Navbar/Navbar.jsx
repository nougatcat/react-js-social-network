import { NavLink } from 'react-router-dom';
import css from'./Navbar.module.css'


//let cssPlus = `${css.item} ${css.active}` //конкатенация строк с пробелом


const Navbar = () => {
    return (
        <nav className={css.navigation}>
            <div>
                <NavLink to="/profile" className = { navData => navData.isActive ? css.active : css.item }>Профиль</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" className = { navData => navData.isActive ? css.active : css.item }>Сообщения</NavLink>
            </div>
            {/* <div>
                <NavLink to="/news" className = { navData => navData.isActive ? css.active : css.item }>Новости</NavLink>
            </div>
            <div>
                <NavLink to="/music" className = { navData => navData.isActive ? css.active : css.item }>Музыка</NavLink>
            </div>
            <div>
                <NavLink to="/settings" className = { navData => navData.isActive ? css.active : css.item }>Настройки</NavLink>
            </div>  */}
            <div>
                <NavLink to="/users" className = { navData => navData.isActive ? css.active : css.item }>Пользователи</NavLink>
            </div> 
        </nav>
    )
}

export default Navbar;