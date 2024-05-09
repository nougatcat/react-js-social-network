import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utilities/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls';

const maxLength10 = maxLengthCreator(10)

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newPostElement'
                    validate={[required, maxLength10]} placeholder='Что у вас нового?' />
            </div>
            <div>
                <button>Опубликовать</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm({ form: 'ProfileAddPostForm' })(AddPostForm)



const MyPosts = React.memo(props => { //для примера из урока 87

    let postsElements = props.posts
        .map(post => <Post message={post.message} likes={post.likesCount} />);

    let toAddPost = (values) => {
        props.addPost(values.newPostElement);
    };

    return (
        <div className={classes.posts}>
            <h3>Мои посты</h3>
            <div>
                <AddPostReduxForm onSubmit={toAddPost}/>
            </div>
            <div className={classes.posts__msg}>
                {postsElements}
            </div>
        </div>
    )
})
// class MyPosts extends React.PureComponent {

//     render() {
//         console.log('renderererere')
//         let postsElements = this.props.posts
//             .map(post => <Post message={post.message} likes={post.likesCount} />);

//         let toAddPost = (values) => {
//             this.props.addPost(values.newPostElement);
//         };

//         return (
//             <div className={classes.posts}>
//                 <h3>Мои посты</h3>
//                 <div>
//                     <AddPostReduxForm onSubmit={toAddPost} />
//                 </div>
//                 <div className={classes.posts__msg}>
//                     {postsElements}
//                 </div>
//             </div>
//         )

//     }

// }

export default MyPosts;