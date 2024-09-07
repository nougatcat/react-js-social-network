// import React from 'react';

import { actions } from '../../redux/dialogs-reducer.ts';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


let mapStateToProps = (state) => { //данные из state
    return {
        state: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) => { //коллбеки, которые отпраятся в презентационную компоненту
    return {
        onSendMessageClick: (newMessageBody) => {
            dispatch(actions.sendMessageCreator(newMessageBody));
        }
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs);