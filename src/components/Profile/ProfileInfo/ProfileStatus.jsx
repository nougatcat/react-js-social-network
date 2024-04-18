import css from './ProfileInfo.module.css'

import React from "react";


class ProfileStatus extends React.Component {
    //локальный state
    state = {
        editMode: false
    } 

    activateEditMode() {
        this.setState( { //асинхронная функция, выполняется после всей отрисовки
            editMode: true
        })
        // this.forceUpdate(); //не стоит использовать для переотрисовки вместо сетстейт
    }
    deactivateEditMode() {
        this.setState( {editMode: false} )
    }

    render() {
        return (
            <div>
                {!this.state.editMode && 
                    <div>
                        <span className={css.change__status} onClick={this.activateEditMode.bind(this)}>
                            {this.props.status}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)}  value={this.props.status}/>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;