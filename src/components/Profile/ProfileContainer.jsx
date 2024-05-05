import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getStatus, getUserProfile, updateStatus } from '../../redux/profile-reducer';
import { compose } from "redux";
import { useParams } from "react-router"; //делаем обертку для хука, чтобы использовать аналог withRouter
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
export const withRouter = (Component) => {
    return (props) => {
        const match = { params: useParams() };
        return <Component match={match} {...props} />;
    };
};


class ProfileContainer extends React.Component {
    componentDidMount() { //покажет страницу profile/id
        let userId = this.props.match.params.userId;
        if (!userId) {//для страницы /profile без id 
            userId = this.props.id;
            //эта проверка теперь бессмысленна, так как выкидвает на логин если не авторизован
            //чтобы не будучи залогиненным можно было просматривать чужие страницы, нужно прописать props.history( но он не работает на новой версии роутера) или использовать хуки (в комментах к уроку 80 скорее всего есть рабочее решение)
            // if (this.props.id) {
            //     userId = this.props.id; 
            // }
            // else {
            //     userId = 31028
            // }
        } 
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    render() {
        
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }
}

let mapStateToProps = (state) => ({ 
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    id: state.auth.id,
    // isAuth: state.auth.isAuth 
});


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)