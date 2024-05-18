import { Field, Form, Formik } from 'formik';

const usersSearchFormValidate = (values) => {
    const errors = {};
    return errors;
}

const UsersSearchForm = (props) => {

    const submit = (values, { setSubmitting }) => { //setSubmitting содержит параметр isSubmitting true/false
        props.onFilterChanged(values)
        //setSubmitting(false)
    } //submit автоматически переводит isSubmitting в true

    return (
        <div>
            <Formik
                initialValues={{ term: '' }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
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