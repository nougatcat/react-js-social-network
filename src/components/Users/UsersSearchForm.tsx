import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../redux/users-reducer';

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
} 
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = (props) => {
// { setSubmitting } : { setSubmitting: (isSubmitting: boolean) => void} - это типизация setSubmitting
    const submit = (values: FormType, { setSubmitting } : { setSubmitting: (isSubmitting: boolean) => void}) => { //setSubmitting содержит параметр isSubmitting true/false
        const filter = { //преобразуем типы вручную
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false) //Это нужно чтобы кнопка не выключалась. Но тут кнопка не выключается во время загрузки страницы. Правильно: Должно быть выставлено сразу после запроса на сервер, чтобы во время запроса кнопка выключалась, а потом включалась
    } //submit автоматически переводит isSubmitting в true

    return (
        <div>
            <Formik
                initialValues={{ term: '', filter: null }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        {/* селектор */}
                        <Field name='friend' as='select'>
                            <option value="null">Все</option>
                            <option value="true">Подписки</option>
                            <option value="false">Не подписан</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Найти
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const UsersSearchFormMemo = React.memo(UsersSearchForm)

export default UsersSearchFormMemo