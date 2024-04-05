import React from "react";
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth-reducer";
import { getMyProfileData } from "../../api/api";

class HeaderContainer extends React.Component {
    // componentDidMount() {
    //     axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
    //         withCredentials: true //учитывать cookie
    //     }) //т.к. запрашиваем с другого сайта, нужно включить межсайтовые cookie в браузере
    //         .then(response => {
    //             if (response.data.resultCode === 0) { //resultcode = 0 в этом api значит, что данные получены - пользователь авторизован
    //                 //первая data - представление данных в axios, вторая data - объект из API с таким названием
    //                 let { id, email, login } = response.data.data;
    //                 this.props.setAuthUserData(id, email, login);
    //             }
    //         });
    // }
    componentDidMount() {
        getMyProfileData()
            .then(data =>{
                if(data.resultCode === 0) {
                    let { id, email, login } = data.data; //первая data - представление данных в axios, вторая data - объект из API с таким названием
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
});
export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);