import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormControls/FormControls";
import { required } from "../../utilities/validators/validators";


const LoginForm = (props) => {
    return <form action="" onSubmit={props.handleSubmit}>
        <div>
            <Field component={Input} validate={[required]} 
            name="login" type="text" placeholder="Login" />
        </div>
        <div>
            <Field component={Input} validate={[required]} 
            name="password" type="text" placeholder="Password" />
        </div>
        <div>
            <Field component={Input} name="rememberMe" type="checkbox" /> Запомнить меня
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm ({form: 'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData); //сделать обработчик авторизации самому или по следующему уроку
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
} 

export default Login;