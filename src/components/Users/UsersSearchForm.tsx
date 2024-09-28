// import { Field, Form, Formik } from 'formik';
import { Field, Formik } from 'formik';
import { Form, SubmitButton, Select, Input } from 'formik-antd'
import React from 'react';
import { FilterType } from '../../redux/users-reducer';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/users-selectors.ts';

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
    term: string
    friend: FriendFormType
} 
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = (props) => {


    const filter = useSelector(getUsersFilter)

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
                enableReinitialize
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form style={{margin: '8px'}}>
                        <Input type="text" name="term" />
                        {/* селектор */}
                        <Select name='friend' style={{minWidth: '120px'}}>
                            <option value="null">Все</option>
                            <option value="true">Подписки</option>
                            <option value="false">Не подписан</option>
                        </Select>
                        <SubmitButton style={{margin: '8px 8px 0 8px'}} type="default" disabled={isSubmitting}>
                            Найти
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const UsersSearchFormMemo = React.memo(UsersSearchForm)

export default UsersSearchFormMemo