
let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as MessagesReceivedSubscriberType[] //нужно для отслеживания сокета, чтобы выключить кнопку тогда, когда невозможно отправить
}
let ws: WebSocket | null = null
const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000) //каждые 3 секунды будет пытаться переподключиться к сокету
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages)) //передаем новые сообщения в массив subscribers
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler) //переед пересозданием сокета убираем листенер, чтобы не было утечки памяти
    ws?.removeEventListener('message', messageHandler) 
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}
function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws?.addEventListener('close', closeHandler) // ws? значит "если не null, то"
    ws?.addEventListener('message', messageHandler) // ws? значит "если не null, то"
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}



export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()

    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback) //"отписка" от subscribe, т.е. перестать слушать сокет и выдать только то, что успело прогрузиться с сервера
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback) //"отписка" от subscribe, т.е. перестать слушать сокет и выдать только то, что успело прогрузиться с сервера
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type EventsNamesType = 'messages-received' | 'status-changed'
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type StatusType = 'pending' | 'ready' | 'error'

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
} 