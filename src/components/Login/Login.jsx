import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input, createField } from "../common/FormControls/FormControls";
import { required } from "../../utilities/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer.ts";
import { Navigate } from "react-router-dom";
import styles from "./../common/FormControls/FormControls.module.css";

const LoginForm = ({handleSubmit, error, captchaUrl}) => { //альтернативное принятие пропсов (только конкретных)
    return <form action="" onSubmit={handleSubmit}>
        <div>
            <Field component={Input} validate={[required]}
                name="email" type="text" placeholder="Email" />
        </div>
        <div>
            <Field component={Input} validate={[required]}
                name="password" type="password" placeholder="Password" />
        </div>
        <div>
            <Field component={Input} name="rememberMe" type="checkbox" /> Запомнить меня
        </div> 
        {/* в уроке 90 эти филды зарефакторены в createField чтобы сократить код, я это не делал, чтобы оставить такой ввод как пример  */}
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

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
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
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth, //если не передать стейт в логин, то проверка на isAuth для редиректа не сработает
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, { login })(Login); //перекидываем диспатчи в логин для онСабмит