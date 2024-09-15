import usersReduser, { actions, InitialStateActionType as InitialState }from "./users-reducer"

let state: InitialState
beforeEach(() => { //чтобы перед каждым тестом значение state сбрасывалось на начальное
state = {
    users: [
        {id: 0, name: 'Dimych 1', followed: false, photos: {small: null, large: null}, status: 'status 0'},
        {id: 1, name: 'Dimych 2', followed: false, photos: {small: null, large: null}, status: 'status 1'},
        {id: 2, name: 'Dimych 3', followed: true, photos: {small: null, large: null}, status: 'status 2'},
        {id: 3, name: 'Dimych 4', followed: true, photos: {small: null, large: null}, status: 'status 3'}
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null as null | boolean
    }
}})

test("follow success", () => {
    const newState = usersReduser(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
}) 
test("unfollow success", () => {
    const newState = usersReduser(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeFalsy()
}) 