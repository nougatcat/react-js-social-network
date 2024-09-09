import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilities/validators/validators.ts";
import {NewMessageFormValuesType} from '../Dialogs';
import { createField, GetStringKeys, Textarea } from '../../common/FormControls/FormControls.tsx';

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = GetStringKeys<NewMessageFormValuesType>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>("Введите сообщение", 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormValuesType>({form: 'dialog-add-message-form'})(AddMessageForm);

