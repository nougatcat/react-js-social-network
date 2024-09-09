import { NavLink } from 'react-router-dom';
import css from './../Dialogs.module.css'
import React from 'react';

type PropsType = {
    Userid: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={css.dialog + ' ' + css.active}><NavLink to={"/dialogs/" + props.Userid}>{props.name}</NavLink></div>
    );
}


export default DialogItem;