import { Field, Form, Formik } from 'formik';

const usersSearchFormValidate = (values) => {
    const errors = {};
    return errors;
}

const UsersSearchForm = (props) => {

    const submit = (values, { setSubmitting }) => { //setSubmitting содержит параметр isSubmitting true/false
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
                            <option value="null">All</option>
                            <option value="true">Followed</option>
                            <option value="false">Not followed</option>
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

export default UsersSearchForm