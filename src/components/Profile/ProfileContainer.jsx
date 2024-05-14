import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getStatus, getUserProfile, savePhoto, updateStatus } from '../../redux/profile-reducer';
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
    requestProfile() { //покажет страницу profile/id
        let userId = this.props.match.params.userId;
        if (!userId) {//для страницы /profile без id 
            userId = this.props.id;
        } 
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.requestProfile()
    }
    // componentDidUpdate() { //!начнет бесконечно слать запросы на сервер, не использовать
    //     this.requestProfile()
    // }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.requestProfile()
        }
    }
    render() {
        
        return (
            <Profile {...this.props} profile={this.props.profile} 
                status={this.props.status} updateStatus={this.props.updateStatus} 
                isOwner={!this.props.match.params.userId} //isOwner тут появится только если мы на странице /profile без id 
                savePhoto={this.props.savePhoto}
                /> 
        )
    }
}

let mapStateToProps = (state) => ({ 
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    id: state.auth.id,
    // isAuth: state.auth.isAuth,

});


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)