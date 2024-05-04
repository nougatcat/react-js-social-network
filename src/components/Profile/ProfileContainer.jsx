import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getStatus, getUserProfile, updateStatus } from '../../redux/profile-reducer';
//import { withRouter } from 'react-router'; //withRouter не существует в новой версии роутера
import { useParams } from "react-router"; //делаем обертку для хука, чтобы использовать аналог withRouter
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
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
            if (this.props.id) {
                userId = this.props.id; 
            }
            else {
                userId = 31028 //запрос выполняется не асинхронно, следовательно при первой загрузке все равно выведет этот профиль. Это печально
            }
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
    // withAuthRedirect //перекидывает на login. Пофиксим в будущем (скорее всего в каком-то из уроков)
)(ProfileContainer)