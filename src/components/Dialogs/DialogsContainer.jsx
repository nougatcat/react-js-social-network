// import React from 'react';

import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


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

let AuthRedirectComponent = withAuthRedirect(Dialogs); // добавление возможности редиректа с помощью хока


const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);


export default DialogsContainer;