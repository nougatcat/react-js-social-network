import React from "react";
import Profile from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from '../../redux/profile-reducer';
//import { withRouter } from 'react-router'; //withRouter не существует в новой версии роутера
import { useParams } from "react-router"; //делаем обертку для хука, чтобы использовать аналог withRouter
export const withRouter = (Component) => {
    return(props) => {
        const match = {params: useParams()};
        return <Component match={match} {...props} />;
    };
};


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId=2;
        // debugger;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then(response => {
            this.props.setUserProfile(response.data);
        });
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

let WithUrlDataContainerComponent =  withRouter(ProfileContainer); //для отслеживания адресной строки

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);