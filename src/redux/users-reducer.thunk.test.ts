import { APIResponseType, ResultCodesEnum } from "../api/api"
import { usersAPI } from "../api/usersAPI"
import { actions, follow, unfollow } from "./users-reducer"

jest.mock("../api/usersAPI") //заменит usersAPI на фейковый без доступа к серверу
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI> //as чтобы были корректные типы у фейка
const APIResponse: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
const dispatchMock = jest.fn() //fake function instead of real for thunk
const getStateMock = jest.fn()
beforeEach(() => {
	dispatchMock.mockClear()
	getStateMock.mockClear()
	usersAPIMock.follow.mockClear()
	usersAPIMock.unfollow.mockClear()
	// вызываем метод mockClear() у всех моков
})

test ('follow thunk success', async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(APIResponse))  // если вызвали фейковый usersAPI, то он должен вернуть промис, который APIResponse
    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toHaveBeenCalledTimes(3) //должен быть вызван 3 раза, потому что в функции _followUnfollowFlow три диспатча (3 передачи (а значит и вызова) функции) значит ResultCode Success
    //проверка порядка диспатчей
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 1)) //первый вызов (диспатч)
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.followSuccess(1)) //2 вызов
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 1)) //3 вызов
})

test ('unfollow thunk success', async () => {
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(APIResponse))  // если вызвали фейковый usersAPI, то он должен вернуть промис, который APIResponse
    const thunk = unfollow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toHaveBeenCalledTimes(3) //должен быть вызван 3 раза, потому что в функции _followUnfollowFlow три диспатча (3 передачи (а значит и вызова) функции) значит ResultCode Success
    //проверка порядка диспатчей
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 1)) //первый вызов (диспатч)
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.unfollowSuccess(1)) //2 вызов
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 1)) //3 вызов
})