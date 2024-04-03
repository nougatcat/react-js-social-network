import { NavLink } from 'react-router-dom';
import css from './../Dialogs.module.css'

const DialogItem = (props) => {
    return (
        <div className={css.dialog + ' ' + css.active}><NavLink to={"/dialogs/" + props.Userid}>{props.name}</NavLink></div>
    );
}


export default DialogItem;