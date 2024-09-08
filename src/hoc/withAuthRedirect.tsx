import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from '../redux/redux-store.ts'

let mapStateToPropsForRedirect = (state: AppStateType) => ({ 
    isAuth: state.auth.isAuth
}) as MapPropsType;
type MapPropsType = {
    isAuth: boolean
} 
type DispatchPropsType = {}
export function withAuthRedirect<WCP extends object> (WrappedComponent: React.ComponentType<WCP>) { //WCP - wrapped component props //wcp тип задается там, где хок вызывается 
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) { return <Navigate to={'/login'} replace={true} />}
        return <WrappedComponent {...restProps as WCP}/>
    } 
    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)
    return ConnectedAuthRedirectComponent
}