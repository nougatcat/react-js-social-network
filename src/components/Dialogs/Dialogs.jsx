import React from 'react';
import css from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';


// если компоненты больше нигде, кроме этого файла, не используются, то нет смысла выносить их отдельно, но можно вынести, чтобы файлы были короткие

const Dialogs = (props) => {

    //преобразуем данные в jsx элементы
    let dialogsElements = props.state.dialogs
        .map( (dialog) => <DialogItem name={dialog.name} Userid={dialog.id} />);

    let messagesElements = props.state.messages
        .map ( m => <Message message={m.message} />)
    //

    let newMessageBody = props.state.newMessageBody;

    let onSendMessageClick = () => {
        props.onSendMessageClick();
    }
    let onNewMessageChange = (event) => {
        let body = event.target.value; //Свойство target интерфейса Event является ссылкой на объект, который был инициатором события
        props.updateNewMessageBody(body); //позволяет вводить в поле свое сообщение
    }

    if (!props.isAuth) {
        return <Navigate to={'/login'} replace={true} /> //Redirect больше нет в доме, используем Navigate
    }
    return (
        <div>
            <div className={css.dialogs}>
                <div className={css.dialogs__items}>
                    {dialogsElements}
                </div>
                <div className={css.messages__items}>
                    <div>{messagesElements}</div>
                    <div>
                        <div>
                            <textarea placeholder='Enter your message'
                                    value={newMessageBody}
                                    onChange={onNewMessageChange}></textarea>
                        </div>
                        <div><button onClick={onSendMessageClick}>send</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
} 




export default Dialogs;