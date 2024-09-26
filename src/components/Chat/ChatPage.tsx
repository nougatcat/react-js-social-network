import React, {useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer.ts";
import { AppDispatch, AppStateType } from "../../redux/redux-store.ts";

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
    
    useEffect(()=>{
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    },[])

    return <div>
        {status === 'error' && <div>Some error occured. Refresh the page</div>}
        <>
            <Messages />
            <AddMessageForm />
        </>
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType)  => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null) //Хук useRef позволяет сохранить некоторый объект, который можно можно изменять и который хранится в течение всей жизни компонента.
    const [isAutoScroll, setAutoScroll] = useState(false)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => { //нужно чтобы вниз перелистывалось только если мы внизу (100рх от низа или меньше)
        const  element = e.currentTarget
        if (Math.abs ((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) //100px 
        {
            !isAutoScroll && setAutoScroll(true)
        } else isAutoScroll && setAutoScroll(false)
    }
    useEffect(() => {
        if (isAutoScroll)
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])
    return <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo( ({ message }) => { //React.memo используем потому что эта компонента часто перерисовывается
    return <div>
        <img style={{ width: '50px' }} src={message.photo} alt="" /><b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
})

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return //прерывание функции
        }
        dispatch(sendMessage(message)) 
        setMessage('') //зануляем поле ввода
    }
    return <div>
        <div><textarea name="" id="" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
        <div><button disabled={status !== 'ready'} onClick={sendMessageHandler}>Отправить</button></div>
    </div>
}

export default ChatPage
//! есть баг с повторной загрузкой одних и тех же сообщений при возвращении на компоненту с другой компоненты