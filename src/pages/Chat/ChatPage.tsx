import React, { useEffect, useState } from "react"

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('close websocket') //создали подписку на websocket, пишем в консоль, если сокет отрубился из-за отсутствия интернета или проблем на сервере
            setTimeout(createChannel, 3000) //каждые 3 секунды будет пытаться переподключиться к сокету
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler) //переед пересозданием сокета убираем листенер, чтобы не было утечки памяти
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws?.addEventListener('close', closeHandler) // ws? значит "если не null, то"
            setWsChannel(ws)
        }
        createChannel()
        return () => { //закрываем листенер при уходе со страницы
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
        
    }, []) // создали websocket

    return <div>
        <Messages wsChannel={wsChannel} />
        <AddMessageForm wsChannel={wsChannel} />
    </div>
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ( {wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages]) //если в качестве второго параметра задать [], а не [wsChannel], то грузить будет при каждой перерисовке (я заметил, что дважды)
        }
        wsChannel?.addEventListener('message', messageHandler)
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

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
const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ( {wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])
    const sendMessage = () => {
        if (!message) {
            return //прерывание функции
        }
        wsChannel?.send(message)
        setMessage('') //зануляем поле ввода
    }
    return <div>
        <div><textarea name="" id="" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
        <div><button disabled={wsChannel == null || readyStatus !== 'ready'} onClick={sendMessage}>send</button></div>
    </div>
}

export default ChatPage