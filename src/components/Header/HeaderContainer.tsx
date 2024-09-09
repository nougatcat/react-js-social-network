import React from "react";
import Header, { DispatchPropsType, MapPropsType } from "./Header.tsx";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer.ts";
import { AppStateType } from "../../redux/redux-store.ts";




class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
    render() {
        return <Header {...this.props} />
    }

}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id 
});
export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);