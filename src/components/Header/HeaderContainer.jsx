import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth-reducer";
import { getMyProfileData } from "../../api/api";

class HeaderContainer extends React.Component {

    componentDidMount() {
        getMyProfileData().then(data => { //покажет справа, что зашел я
            if(data.resultcode === 0) {
                let {id, email, login} = data.data; //первая data - представление данных в axios, вторая data - объект из API с таким названием
                this.props.setAuthUserData(id, email, login);
            }
        })
    }
    render() {
        return <Header {...this.props} />
    }

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id
    // email: state.auth.email
});
export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);