import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post.tsx';
import AddPostForm, { AddPostFormValuesType } from './AddPostForm/AddPostForm.tsx';
import { PostType } from '../../../types/types.ts';

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
type PropsType = MapPropsType & DispatchPropsType

const MyPosts: React.FC<PropsType> = (props) => {
    //важно использовать не reverse(), так как реверс не создаст новый массив, а изменит старый. для примера из урока 88, если использовать reverse, то постоянно будет при перерисовке реверсить массив и он будет то с начала, то с конца
    let postsElements = props.posts.toReversed() //TS по умолчанию не знает про существование этого метода, забей
        .map (post => <Post key={post.id} message={post.message} likes={post.likesCount} />);

    let toAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={classes.posts}>
            <h3>Мои посты</h3>
            <div>
                <AddPostForm onSubmit={toAddPost}/>
            </div>
            <div className={classes.posts__msg}>
                {postsElements}
            </div>
        </div>
    )
}


const MyPostsMemorized = React.memo(MyPosts) //для примера из урока 87

export default MyPostsMemorized;