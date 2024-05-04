
import styles from './FormControls.module.css';


const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.form__control + " " + (hasError ? styles.error : "")} >
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

//тут - props будут содержать все, кроме input и meta. Это rest оператор
export const Textarea = (props) => {
    const {input, meta, children, ...remainingProps} = props;
    return <FormControl {...props}><textarea {...input} {...remainingProps}/></FormControl>
}
export const Input = (props) => {
    const {input, meta, children, ...remainingProps} = props;
    return <FormControl {...props}><input {...input} {...remainingProps}/></FormControl>
}
