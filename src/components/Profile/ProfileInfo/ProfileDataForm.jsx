import { reduxForm } from 'redux-form'
import { Input, Textarea, createField } from '../../common/FormControls/FormControls'
import css from './ProfileInfo.module.css'
import formCss from "./../../common/FormControls/FormControls.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return ( //тот онсабмит, который мы передали - это замена стандартного онсабмит, нельзя писать onSubmit={onSubmit}, надо писать onSubmit={handleSubmit}
        <form onSubmit={handleSubmit} className={css.description__info}>
            <div>Меня зовут {createField('Имя', 'fullName', [], Input)}</div>
            <div>Обо мне: {createField('Я крутой', 'aboutMe', [], Textarea)}</div>
            <div>Ищу работу?
                {createField('', 'lookingForAJob', [], Input, { type: "checkbox" })}
            </div>
            <div>
                {createField('Что я умею', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div className={css.description__info__contacts}>
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

const ProfileDataReduxForm = reduxForm({ form: 'edit-profile', destroyOnUnmount: false })(ProfileDataForm) //destroyOnUnmount:false нужен чтобы работали initialValues



export default ProfileDataReduxForm

