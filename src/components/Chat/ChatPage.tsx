import React, {useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer.ts";
import { AppDispatch, AppStateType } from "../../redux/redux-store.ts";
import { Navigate } from "react-router-dom";
import { getIsAuthSelector } from '../../redux/auth-selectors.ts';
import styles from './ChatPage.module.css'
import userPhoto from '../../assets/images/user.png';
import { Button, Input } from 'antd'
const { TextArea } = Input;

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {
    const isAuth = useSelector(getIsAuthSelector)
    if (!isAuth) { return <Navigate to={'/login'} replace={true} />}
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
    return <div style={{ height: '75vh', overflowY: 'auto' }} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo( ({ message }) => { //React.memo используем потому что эта компонента часто перерисовывается
    return <div className={styles.message}>
        <div className={styles.message_photo}>
            {message.photo
            ? <img style={{ width: '50px' }} src={message.photo} alt={"Юзер"} />
            : <img style={{ width: '50px' }} src={userPhoto} alt={"Юзер"} />
            }
        </div>
        <div className={styles.message_userName}>{message.userName}</div>
        <div className={styles.message_text}>{message.message}</div>
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
        <div><TextArea maxLength={100} placeholder="100 символов - максимум" autoSize style={{margin: '8px 0 8px 0'}} name="" id="" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></TextArea></div>
        <div><Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Отправить</Button></div>
    </div>
}

export default ChatPage
//! есть баг с повторной загрузкой одних и тех же сообщений при возвращении на компоненту с другой компоненты


//!Теле 2 закрывает вебсокет, используй впн или другого провайдера