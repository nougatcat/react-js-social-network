import css from './Header.module.css'

const Header = () => {
    return (
        <header className={css.header}>
            <img className={css.header__image} src = './logo192.png' alt=""/>
        </header>
    )
}

export default Header;