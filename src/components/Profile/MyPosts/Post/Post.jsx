import classes from './Post.module.css'

const Post = (props) => {
    return (

        <div className={classes.item}>
            <img src="https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg" alt="" />
            {props.message}
            <div><span>{props.likes} like</span></div>
        </div>

    )
}

export default Post;