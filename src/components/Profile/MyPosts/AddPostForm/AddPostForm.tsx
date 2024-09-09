import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../../utilities/validators/validators.ts';
import { GetStringKeys, Textarea } from '../../../common/FormControls/FormControls.tsx';
import { createField } from '../../../common/FormControls/FormControls.tsx';

// const maxLength10 = maxLengthCreator(10)
type PropsType = {}
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesKeysType = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {/* <Field component={Textarea} name='newPostElement'
                    // validate={[required, maxLength10]} placeholder='Что у вас нового?' />
                    validate={[required]} placeholder='Что у вас нового?' /> */}
                {createField<AddPostFormValuesKeysType>('Что у вас нового?', 'newPostText', [required], Textarea)}
            </div>
            <div>
                <button>Опубликовать</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType> ({ form: 'ProfileAddPostForm' })(AddPostForm)