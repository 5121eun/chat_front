import { useCallback, useEffect, useRef, useState } from "react"
import { message } from "../definitions"


export default function useSocket(url: string): [ boolean, message[], ((data: string | ArrayBufferLike | Blob | ArrayBufferView) => void) | undefined] {
    const socket = useRef<WebSocket|null>(null)
    const [ messages, setMessages ] = useState<message[]>([])
    const [ connect, setConnect ] = useState(false)

    useEffect(() => {
        const s = new WebSocket(url)
        s.onopen = () => setConnect(true)
        s.onclose = () => setConnect(false)

        socket.current = s

        return () => s.close()
    }, [])

    if (socket != null && socket.current != null) {
        socket.current.onmessage = (e) => {
            setMessages([
                ...messages,
                ...eval(e.data)
            ])
            
        }
    }

    return [ connect, messages, socket.current?.send.bind(socket.current) ]
}
