import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";
import { useAuthStore } from "../store/auth/useAuthStore";

interface SocketContextProps {
    socket: Socket | null;
    online: boolean;
}

export const SocketContext = createContext<SocketContextProps>({
    socket: null,
    online: false
});

export const SocketProvider = ({ children }: PropsWithChildren) => {
    const { socket, online, connect, disconnect } = useSocket('http://localhost:3002');
    const { status } = useAuthStore();

    useEffect(() => {
        if (status === 'authenticated') {
            connect();
        }
    }, [status])

    useEffect(() => {
        if (status !== 'authenticated') {
            disconnect();
        }
    }, [status])

    return (
        <SocketContext.Provider value={{
            socket,
            online
        }}>
            {children}
        </SocketContext.Provider>
    )
}