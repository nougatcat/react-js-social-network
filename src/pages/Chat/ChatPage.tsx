import React, { useEffect, useState } from "react"

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string,
    photo:string,
    userId: number,
    userName: string
}


const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {
    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages]) //!зачем сайт грузит их дважды?
            //setMessages(newMessages) //грузит один раз, но есть проблемы с отображением нового сообщения
        })
    }, [])

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index)=> <Message key={index} message={m} />)}
    </div>
}
const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return <div>
        <img style={{width: '50px'}} src={message.photo} alt="" /><b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
}
const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if (!message) {
            return //прерывание функции
        }
        wsChannel.send(message)
        setMessage('') //зануляем поле ввода
    }
    return <div>
        <div><textarea name="" id="" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
        <div><button onClick={sendMessage}>send</button></div>
    </div>
}

export default ChatPage