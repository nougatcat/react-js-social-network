
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import styles from './FormControls.module.css';
import React from 'react';
import { FieldValidatorType } from '../../../utilities/validators/validators';


// type FormControlPropsType = {
//     meta: {
//         touched: boolean
//         error: string
//     },
//     children: React.ReactNode //ReactNode значит, что возвращается компонента
// }
type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode //ReactNode значит, что возвращается компонента
}

// const FormControl = ({input, meta, ...props}) => { //children - children of props
const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={styles.form__control + " " + (hasError ? styles.error : "")} >
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


//тут - props будут содержать все, кроме input и meta. Это rest оператор
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, children, ...remainingProps} = props;
    const {input, meta, ...remainingProps} = props;
    return <FormControl {...props}><textarea {...input} {...remainingProps}/></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, children, ...remainingProps} = props;
    const {input, meta, ...remainingProps} = props;
    return <FormControl {...props}><input {...input} {...remainingProps}/></FormControl>
}



export function createField<FormKeysType extends string>(placeholder: string | undefined, 
                            name: FormKeysType,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder} name={name}
                validate={validators}
                component={component}
                {...props} /> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>


// export const createField = (placeholder: string | undefined, name: LoginFormValuesTypeKeys, 
//                             validators: Array<FieldValidatorType>, 
//                             component: React.FC<WrappedFieldProps>, 
//                             props = {}, text = "") => {
//     return <div>
//         <Field placeholder={placeholder} name={name}
//                 validate={validators}
//                 component={component}
//                 {...props} /> {text}
//     </div>
// }
