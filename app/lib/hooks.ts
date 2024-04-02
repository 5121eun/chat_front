import { useEffect, useState } from "react";

export function useSocket(url: string) {
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const s = new WebSocket(url)

        setSocket(s)

        return socket?.close()
    }, []);

    return socket;
}