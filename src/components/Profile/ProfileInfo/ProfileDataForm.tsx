import { InjectedFormProps, reduxForm } from 'redux-form'
import { GetStringKeys, Input, Textarea, createField } from '../../common/FormControls/FormControls.tsx'
import css from './ProfileInfo.module.css'
import formCss from "./../../common/FormControls/FormControls.module.css";
import React from 'react';
import { ProfileType } from '../../../types/types.ts';


type PropsType = {
    profile: ProfileType
    // handleSubmit: 
    // error: не надо типизировать
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return ( //тот онсабмит, который мы передали - это замена стандартного онсабмит, нельзя тут писать onSubmit={onSubmit}, надо писать onSubmit={handleSubmit}
        <form onSubmit={handleSubmit} className={css.description__info}>
            <div>Меня зовут {createField('Имя', 'fullName', [], Input)}</div>
            <div>Обо мне: {createField('Я крутой', 'aboutMe', [], Textarea)}</div>
            <div>Ищу работу?
                {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: "checkbox" })}
            </div>
            <div>
                {createField<ProfileTypeKeys>('Что я умею', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <div><b>Контакты</b></div>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        Введите {key}: {createField(key, 'contacts.' + key, [], Input)}
                        {/* тут : - это просто текст */}
                    </div>
                })}
            </div>
            {error && <div className={formCss.formSummaryError}>
                {error}
            </div>}
            <div><button>Сохранить</button></div>
            {/* т.к. используем редакс форм, на кнопку не надо писать онклик */}
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile', destroyOnUnmount: false })(ProfileDataForm) //destroyOnUnmount:false нужен чтобы работали initialValues



export default ProfileDataReduxForm

