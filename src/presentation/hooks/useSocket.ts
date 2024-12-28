import { useCallback, useEffect, useState } from "react"
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from "../store/auth/useAuthStore";
import { StorageAdapter } from "../../config/helpers/storage.adapter";

export const useSocket = (serverPath: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [online, setOnline] = useState(false);
    const { user } = useAuthStore();

    useEffect(() => {
        setOnline(!!socket?.connected);
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline(true));
    }, [socket])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline(false));
    }, [socket])

    useEffect(() => {
        if (user?.id) {
            socket?.emit('setup', user?.id);
        }
    }, [socket, user?.id])

    const connect = useCallback(async () => {
        const token = await StorageAdapter.getItem('token');
        const socketTemp = io(serverPath, {
            transports: ['websocket', 'polling', 'flashsocket'],
            query: {
                'x-token': token
            }
        });
        setSocket(socketTemp);
    }, [serverPath]);

    const disconnect = useCallback(() => {
        socket?.disconnect();
    }, [socket]);

    return {
        socket,
        online,
        connect,
        disconnect
    };
}