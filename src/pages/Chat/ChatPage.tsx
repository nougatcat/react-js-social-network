import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer.ts";
import { AppDispatch, AppStateType } from "../../redux/redux-store";

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
    
    useEffect(()=>{
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    },[])

    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType)  => state.chat.messages)

    return <div style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((m, index) => <Message key={index} message={m} />)}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return <div>
        <img style={{ width: '50px' }} src={message.photo} alt="" /><b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
}
const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch: AppDispatch = useDispatch()


    const sendMessageHandler = () => {
        if (!message) {
            return //прерывание функции
        }
        dispatch(sendMessage(message)) 
        setMessage('') //зануляем поле ввода
    }
    return <div>
        <div><textarea name="" id="" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
        <div><button disabled={false} onClick={sendMessageHandler}>send</button></div>
    </div>
}

export default ChatPage