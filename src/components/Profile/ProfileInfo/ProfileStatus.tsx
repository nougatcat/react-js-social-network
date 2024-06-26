import css from './ProfileInfo.module.css'
import React, { ChangeEvent } from "react";
//!Больше не используется. Используется ProfileStatusWithHooks
//!Файл остался для примера локального state и типов к нему

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}
class ProfileStatus extends React.Component<PropsType, StateType> {

    //локальный state
    state = {
        editMode: false,
        status: this.props.status
    } 

    activateEditMode() {
        this.setState( { //асинхронная функция, выполняется после всей отрисовки
            editMode: true
        })
    }
    deactivateEditMode = () => { //альт запись чтобы не биндить 
        this.setState( {editMode: false} )
        this.props.updateStatus(this.state.status) //статус из локального стейта передается в глобальный и на сервер
    }
    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: event.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) { //prev - previous (до момента обновления)
        if (prevProps.status !== this.props.status) { //синхронизация global state, чтобы не был пустой статус при редактировании
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode && 
                    <div>
                        <span className={css.change__status} onClick={this.activateEditMode.bind(this)}>
                            {!this.props.status ? 'задать статус' : this.props.status}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}  value={this.state.status}/> 
                        {/* если написать value={this.props.status}, то не будет работать, так как в пропсах приходит глобалный статус и его нельзя изменить через поле ввода */}
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;