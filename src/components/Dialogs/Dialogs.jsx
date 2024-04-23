import React from 'react';
import css from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormControls/FormControls';
import { maxLengthCreator, required } from '../../utilities/validators/validators';

const maxLength50 = maxLengthCreator(50)

// если компоненты больше нигде, кроме этого файла, не используются, то нет смысла выносить их отдельно, но можно вынести, чтобы файлы были короткие


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength50]}
                    name='newMessageBody' placeholder='Введите сообщение'></Field>
            </div>
            <div><button>Отправить</button></div>
        </form>
    )
}
const AddMessageReduxForm = reduxForm ({form: 'dialogAddMessageForm'})(AddMessageForm)




const Dialogs = (props) => {

    //преобразуем данные в jsx элементы
    let dialogsElements = props.state.dialogs
        .map((dialog) => <DialogItem name={dialog.name} Userid={dialog.id} />);

    let messagesElements = props.state.messages
        .map(m => <Message message={m.message} />)

    const addNewMessage = (values) => {
        props.onSendMessageClick(values.newMessageBody)
        
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
                        <AddMessageReduxForm onSubmit={addNewMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}




export default Dialogs;