import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input, createField } from "../common/FormControls/FormControls.tsx";
import { required } from "../../utilities/validators/validators.ts";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer.ts";
import { Navigate } from "react-router-dom";
import styles from "./../common/FormControls/FormControls.module.css";
import { AppStateType } from "../../redux/redux-store.ts";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

//функциональная компонента 1. типа InjectedFormProps, возвращающая тип LoginFormValues и LongFormOwnProps для redux-form и 2.Типа LoginFormOwnProps (это пропсы не из редакс-форм)
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => { //альтернативное принятие пропсов (только конкретных)
    return <form action="" onSubmit={handleSubmit}> 
        {/* <div>
            <Field component={Input} validate={[required]}
                name="email" type="text" placeholder="Email" />
        </div>
        <div>
            <Field component={Input} validate={[required]}
                name="password" type="password" placeholder="Password" />
        </div>
        <div>
            <Field component={Input} name="rememberMe" type="checkbox" /> Запомнить меня
        </div>  */}
        {/*филды зарефакторены в createField чтобы сократить код */}
        {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
        {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
        {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

        {captchaUrl && <img alt="captcha" src={captchaUrl} />}
        {captchaUrl && createField('Символы с картинки','captcha',[required],Input)}
        {error && <div className={styles.formSummaryError}>
            {/* встроенный обработчик ошибок редакс форм, заданный ранее как _error */}
            {error}
        </div>}
        <div>
            <button>Войти</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: any) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

// type LoginFormValuesTypeKeys = keyof LoginFormValuesType //тут м.б. ключи типов string и number
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string> //тут ключи только типа strings

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }

    return <div>
        <h1>Авторизация</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth, //если не передать стейт в логин, то проверка на isAuth для редиректа не сработает
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, { login })(Login); //перекидываем диспатчи в логин для онСабмит