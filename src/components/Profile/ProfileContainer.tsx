import React from "react";
import Profile from "./Profile.tsx";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { getStatus, getUserProfile, savePhoto, saveProfile, updateStatus } from '../../redux/profile-reducer.ts';
import { compose } from "redux";
import { useParams } from "react-router"; //делаем обертку для хука, чтобы использовать аналог withRouter
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { AppStateType } from "../../redux/redux-store.ts";
import { ProfileType } from "../../types/types.ts";
export const withRouter = (Component) => {
    return (props) => {
        const match = { params: useParams() };
        return <Component match={match} {...props} />;
    };
};

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus : (status: string) => void
    savePhoto : (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PropsType = MapPropsType & DispatchPropsType

class ProfileContainer extends React.Component<PropsType> { //withRouter не типизирован, ругается на match
    requestProfile() { //покажет страницу profile/id
        let userId = this.props.match.params.userId;
        if (!userId) {//для страницы /profile без id 
            userId = this.props.id;
        }
        if (!userId) {
            console.error('id should exist in URI params or in state (authorizedUserId)')
        } else {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }

    }
    componentDidMount() {
        this.requestProfile()
    }
    // componentDidUpdate() { //!начнет бесконечно слать запросы на сервер, не использовать
    //     this.requestProfile()
    // }
    componentDidUpdate(prevProps: PropsType) { //нужно чтобы при переходе на /profile без id перекидывало на мой профиль без перезагрузки страницы
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.requestProfile()
        }
    }
    render() {
        if (this.props.id == this.props.match.params.userId) { //чтобы кидало на /profile когда заходишь на свой акк, а не на profile/id, на котором отключена возможность редактирования. Не строгое равно т.к. сравнение int и string ((можно вместо этого использовать === и тоСтринг))
            return <Navigate to={'/profile'} replace={true}/>
        }
        return (
            <Profile {...this.props} profile={this.props.profile} 
                status={this.props.status} updateStatus={this.props.updateStatus} 
                isOwner={!this.props.match.params.userId} //isOwner тут появится только если мы на странице /profile без id 
                savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile}
                /> 
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({ 
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    id: state.auth.id,
    // isAuth: state.auth.isAuth,

});


export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)