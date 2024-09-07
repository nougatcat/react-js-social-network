import profileReducer, { actions } from "./profile-reducer";

let state = {
    posts : [
        { id: 1, message: 'Я что-то написал', likesCount: 2 },
        { id: 2, message: 'Привет мир', likesCount: 51 }
    ],
    profile: null,
    status: ''
    // newPostText: ''
}

it('amount of posts should be increasing',() => {
    //1. test data
    let action = actions.addPostActionCreator('hello world')
    //2. action
    let newState = profileReducer(state,action)
    //3. expectation
    expect( newState.posts.length).toBe(3)
})
it('new message should be correct',() => {
    //1. test data
    let action = actions.addPostActionCreator('hello world')
    //2. action
    let newState = profileReducer(state,action)
    //3. expectation
    expect( newState.posts[2].message).toBe('hello world')
})
it('deleting post should decrease amount of posts',() => {
    //1. test data
    let action = actions.deletePost(1)
    //2. action
    let newState = profileReducer(state,action)
    //3. expectation
    expect( newState.posts.length).toBe(1)
})
it('deleting post should decrease amount of posts if id is incorrect',() => {
    //1. test data
    let action = actions.deletePost(5)
    //2. action
    let newState = profileReducer(state,action)
    //3. expectation
    expect( newState.posts.length).toBe(2)
})




