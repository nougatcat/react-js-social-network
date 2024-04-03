
import css from './../Dialogs.module.css'

const Message = (props) => {
    return(
        <div className={css.message}>{props.message}</div>
    );
}



export default Message;