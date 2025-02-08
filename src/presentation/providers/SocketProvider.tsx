import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";
import { useAuthStore } from "../store/auth/useAuthStore";
import { useChatStore } from "../store/chat/useChatStore";
import { ChatMapper } from "../../infrastructure/mappers/chat.mapper";
import { MessageMapper } from "../../infrastructure/mappers/message.mapper";
import { useMessageStore } from "../store/messages/useMessageStore";
import { SOCKET_URL as PROD_URL, SOCKET_URL_ANDROID, SOCKET_URL_IOS, STAGE } from "@env";
import { Platform } from "react-native";


export const SOCKET_URL =
    (STAGE === 'prod')
        ? PROD_URL
        : Platform.OS === 'ios'
            ? SOCKET_URL_IOS
            : SOCKET_URL_ANDROID

interface SocketContextProps {
    socket: Socket | null;
    online: boolean;

    joinChat: (id: string) => void;
    leaveChat: (id: string) => void;
    sendMessage: (sender: string, content: string, image: string) => void;
}

export const SocketContext = createContext<SocketContextProps>({
    socket: null,
    online: false,
    joinChat: () => { throw new Error('joinChat not implemented') },
    leaveChat: () => { throw new Error('leaveChat not implemented') },
    sendMessage: () => { throw new Error('sendMessage not implemented') },
});

export const SocketProvider = ({ children }: PropsWithChildren) => {
    const { socket, online, connect, disconnect } = useSocket(SOCKET_URL);
    const { status } = useAuthStore();
    const { chat, updateUserChats } = useChatStore();
    const { setMessages } = useMessageStore();

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



    const joinChat = (id: string) => {
        socket?.emit('join-chat', id);
    }

    const leaveChat = (id: string) => {
        socket?.emit('leave-chat', id);
    }

    const sendMessage = (sender: string, content: string, image: string) => {
        const payload = {
            message: {
                sender,
                content,
                chat: chat.id,
                image
            },
            chat
        }

        socket?.emit('personal-message', payload)

    }

    useEffect(() => {
        socket?.on('personal-message-chat', (payload) => {
            const { chat: chatPayload } = payload;
            const { chat: updatedChat, unseenMessages } = chatPayload;
            const chatEntity = ChatMapper.toEntity(updatedChat, unseenMessages);
            updateUserChats(chatEntity);
        });
    }, [socket])

    useEffect(() => {
        socket?.on('personal-message-local', (payload) => {
            const { message } = payload;
            const messageEntity = MessageMapper.toEntity(message);
            setMessages(messageEntity);
        });
    }, [socket])

    return (
        <SocketContext.Provider value={{
            socket,
            online,

            joinChat,
            leaveChat,

            sendMessage
        }}>
            {children}
        </SocketContext.Provider>
    )
}