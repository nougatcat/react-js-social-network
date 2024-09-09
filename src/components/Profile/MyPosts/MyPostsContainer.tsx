// import React from 'react';
import { actions } from '../../../redux/profile-reducer.ts';
import { AppStateType } from '../../../redux/redux-store.ts';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts.tsx';
import { connect } from 'react-redux';


let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
        // newPostText: state.profilePage.newPostText
    } as MapPropsType
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: (newPostText) => { 
//             dispatch(actions.addPostActionCreator(newPostText));
//         }
//     }
// } 

type OwnPropsType = {}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    // mapDispatchToProps
    {addPost: actions.addPostActionCreator}
)(MyPosts);

export default MyPostsContainer;