import css from './ProfileInfo.module.css'

import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Input } from 'antd'
const { TextArea } = Input;

type PropsType = {
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status) //при этом создастся локальная копия status и работать мы будем с ней, не трогая то, что пришло в пропс до тех пор, пока не вызовем updateStatus

    const activateEditMode = () => {
        if (props.isOwner) setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status) //прокидываем локальный статус в глобальный статус
    }
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value)
    }

    useEffect (() => { //нужно писать какие-то условия, чтобы useEffect не вызывался бесконечно. Условие прописыватся вторым параметром
        setStatus(props.status)
    }, [props.status] ) //эффект для синхронизации статуса глобального с локальным, вместо componentDidUpdate


    return (
        <div>
            {!editMode &&
                <div>
                    <span className={css.change__status} onClick={activateEditMode}>
                        {!props.status ? 'Задать статус' : props.status}
                    </span>
                </div>
            }
            {editMode &&
                <div>
                    <TextArea autoSize maxLength={300} placeholder="300 символов - максимум" onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;