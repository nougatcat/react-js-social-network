// import React from 'react';

import { actions } from '../../redux/dialogs-reducer.ts';
import Dialogs from './Dialogs.tsx';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.js';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store.ts';


let mapStateToProps = (state: AppStateType) => { //данные из state
    return {
        dialogsPage: state.dialogsPage
        // isAuth: state.auth.isAuth
    }
}
// let mapDispatchToProps = (dispatch) => { //коллбеки, которые отпраятся в презентационную компоненту
//     return {
//         onSendMessageClick: (newMessageBody) => {
//             dispatch(actions.sendMessage(newMessageBody));
//         }
//     }
// }


export default compose<React.ComponentType>(
    connect(mapStateToProps,{...actions}),
    withAuthRedirect
)(Dialogs);