import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = (props) => {

    let postsElements = props.posts
        .map(post => <Post message={post.message} likes={post.likesCount}/>);

    let newPostElement = React.createRef();

    let toAddPost = () => {
        props.addPost();
    };
    
    let onPostChange = () => { 
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }


    return (
            <div className={classes.posts}>
                <h3>Мои посты</h3>
                <div> 
                    <div><textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}/></div>
                    <div><button onClick={toAddPost}>add post</button></div>
                </div>
                <div className={classes.posts__msg}> 
                    {postsElements}
                </div>
            </div>
    )
}

export default MyPosts;