import React from 'react';
import css from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem.jsx';
import Message from './Message/Message.jsx';
import { InitialStateType } from '../../redux/dialogs-reducer.ts';
import AddMessageForm from './AddMessageForm/AddMessageForm.tsx';


export type NewMessageFormValuesType = {
    newMessageBody: string
}

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}


const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage
    
    //преобразуем данные в jsx элементы
    let dialogsElements = state.dialogs
        .map((dialog) => <DialogItem name={dialog.name} Userid={dialog.id} />);

    let messagesElements = state.messages
        .map(m => <Message message={m.message} />)

    const addNewMessage = (values: {newMessageBody: string}) => {
        props.sendMessage(values.newMessageBody)
        
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
                        <AddMessageForm onSubmit={addNewMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}




export default Dialogs;