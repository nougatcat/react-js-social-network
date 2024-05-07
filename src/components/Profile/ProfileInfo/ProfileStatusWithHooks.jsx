import css from './ProfileInfo.module.css'

import React, { useState } from "react";


const ProfileStatusWithHooks = (props) => {

    //let stateWithSetState = useState(false)
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status) //при этом создастся локальная копия status и работать мы будем с ней, не трогая то, что пришло в пропс до тех пор, пока не вызовем updateStatus

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status) //прокидываем локальный статус в глобальный статус
    }
    const onStatusChange = (event) => {
        setStatus(event.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span className={css.change__status} onClick={activateEditMode}>
                        {!props.status ? 'задать статус' : props.status}
                    </span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;