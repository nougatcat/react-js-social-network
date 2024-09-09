import css from './../Dialogs.module.css'
import React from 'react';

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return(
        <div className={css.message}>{props.message}</div>
    );
}



export default Message;