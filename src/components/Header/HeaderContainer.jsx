import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getMyProfileData, setAuthUserData } from "../../redux/auth-reducer";
import { usersAPI } from "../../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getMyProfileData();
    }
    render() {
        return <Header {...this.props} />
    }

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id
});
export default connect(mapStateToProps, { setAuthUserData, getMyProfileData })(HeaderContainer);