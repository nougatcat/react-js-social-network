
let subscribers = [] as SubscriberType[]
let ws: WebSocket | null = null
const closeHandler = () => {
    console.log('close websocket') //создали подписку на websocket, пишем в консоль, если сокет отрубился из-за отсутствия интернета или проблем на сервере
    setTimeout(createChannel, 3000) //каждые 3 секунды будет пытаться переподключиться к сокету
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages)) //передаем новые сообщения в массив subscribers
}
function createChannel() {
    ws?.removeEventListener('close', closeHandler) //переед пересозданием сокета убираем листенер, чтобы не было утечки памяти
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler) // ws? значит "если не null, то"
    ws?.addEventListener('message', messageHandler) // ws? значит "если не null, то"
}



export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler) 
        ws?.close()

    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback) //"отписка" от subscribe, т.е. перестать слушать сокет и выдать только то, что успело прогрузиться с сервера
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback) //"отписка" от subscribe, т.е. перестать слушать сокет и выдать только то, что успело прогрузиться с сервера
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}


type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
} 