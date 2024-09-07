// import React from 'react';
import { actions } from '../../../redux/profile-reducer.ts';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostElement) => { 
            dispatch(actions.addPostActionCreator(newPostElement));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;