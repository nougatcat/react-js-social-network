import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile } from '../../redux/profile-reducer';
//import { withRouter } from 'react-router'; //withRouter не существует в новой версии роутера
import { useParams } from "react-router"; //делаем обертку для хука, чтобы использовать аналог withRouter
import { usersAPI } from "../../api/api";
export const withRouter = (Component) => {
    return (props) => {
        const match = { params: useParams() };
        return <Component match={match} {...props} />;
    };
};


class ProfileContainer extends React.Component {
    componentDidMount() { //покажет страницу profile/id
        let userId = this.props.match.params.userId;
        if (!userId) userId = 2; //для страницы /profile без id 
        usersAPI.getProfileInfo(userId).then(data => {
            this.props.setUserProfile(data);
        })
    }
    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

let mapStateToProps = (state) => ({ //альт запись ретурна
    profile: state.profilePage.profile

});

let WithUrlDataContainerComponent = withRouter(ProfileContainer); //для отслеживания адресной строки

export default connect(mapStateToProps, { setUserProfile })(WithUrlDataContainerComponent);