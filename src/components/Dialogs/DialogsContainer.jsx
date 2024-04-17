// import React from 'react';

import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';
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
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        onSendMessageClick: () => {
            dispatch(sendMessageCreator());
        }
    }
}





export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs);