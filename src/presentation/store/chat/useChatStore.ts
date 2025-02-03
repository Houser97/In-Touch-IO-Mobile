import { Chat } from "../../../domain/entities/chat.entity";
import { create } from "zustand";
import { chatRepositoryProvider } from "../../providers/repositories/chat-repository.provider";
import { ChatMapper } from "../../../infrastructure/mappers/chat.mapper";
import { CustomError } from "../../../infrastructure/errors/custom.error";
import { useAuthStore } from "../auth/useAuthStore";
import { DateAdapter } from "../../../config/helpers/date.adapter";

export interface UserChats {
    [key: string]: Chat;
}

export interface FormattedChats {
    id: string,
    name: string,
    pictureUrl: string,
    content: string,
    unseen: string[],
    formattedTime: string,
    senderId: string
}

export interface ChatState {
    chat: Chat;
    userChats: UserChats;
    formattedChat: FormattedChats[];


    selectChat: (chatId: string) => void;
    setUserChats: (chats: UserChats) => void;
    updateUserChats: (chat: Chat) => void;
    getUserChats: () => Promise<void>;
    getUnseenMessageIds: (chat: Chat) => string[];
    clearChat: () => void;
    clearUnseenMessages: (chatId: string) => void;
    createChat: (userIds: string[]) => Promise<void>;
}

const chatInitialState: Chat = {
    id: "",
    users: [],
    lastMessage: null,
    unseenMessages: [],
    updatedAt: new Date(),
}

export const useChatStore = create<ChatState>()((set, get) => ({
    chat: chatInitialState,
    userChats: {},
    formattedChat: [],

    selectChat: (chatId: string) => {
        const chat = get().userChats[chatId];
        set((state) => ({...state, chat}));
    },

    updateUserChats: (newChat: Chat) => {
        const updatedChats = {...get().userChats};
        delete updatedChats[newChat.id];

        const chats = {[newChat.id]: newChat, ...updatedChats}

        const result: FormattedChats[] = [];
        Object.keys(chats).map((key) => {
            const chat = chats[key]
            const { id, users, lastMessage, updatedAt } = chat
    
            const senderId = lastMessage?.sender || '';
            const content = lastMessage ? lastMessage?.content || '' : 'empty';
    
            const friend = users.find((chatUser) => chatUser.id !== useAuthStore.getState().user?.id);
            const { name, pictureUrl } = friend!;
    
            const unseen = get().getUnseenMessageIds(chat);
    
            const formattedTime = DateAdapter.convertTimestamp(updatedAt.toString()); 
            const data = {
                id,
                name,
                pictureUrl,
                content,
                unseen,
                formattedTime,
                senderId
            }
            result.push(data);
        })

        set((state) => ({
            ...state,
            userChats: chats,
            formattedChat: result
        }))
    },

    setUserChats: (chats: UserChats) => {
        const result: FormattedChats[] = [];
        Object.keys(chats).map((key) => {
            const chat = chats[key]
            const { id, users, lastMessage, updatedAt } = chat
    
            const senderId = lastMessage?.sender || '';
            const content = lastMessage ? lastMessage?.image || lastMessage?.content : 'empty';
    
            const friend = users.find((chatUser) => chatUser.id !== useAuthStore.getState().user?.id);
            const { name, pictureUrl } = friend!;
    
            const unseen = get().getUnseenMessageIds(chat);
    
            const formattedTime = DateAdapter.convertTimestamp(updatedAt.toString()); 
            const data = {
                id,
                name,
                pictureUrl,
                content,
                unseen,
                formattedTime,
                senderId
            }
            result.push(data);
        })

        set((state) => ({
            ...state,
            userChats: chats,
            formattedChat: result
        }))
    },

    getUserChats: async () => { 
        try {
            const chats = await chatRepositoryProvider.getByUserId();
            get().setUserChats(ChatMapper.toObject(chats));
        } catch (error: any | CustomError) {
            if (error.status === 401) {
                const logout = useAuthStore.getState().logout;
                logout();
            } else {
                console.log(error);
            }
        }
     },

    getUnseenMessageIds: (chat: Chat) => {
        const user = useAuthStore.getState().user;
        return chat.unseenMessages
        .filter(message => message.sender != user?.id)
        .map((message) => message.id);
    },

    clearChat: () => { 
        set((state) => ({...state, chat: chatInitialState}));
     },

    clearUnseenMessages: (chatId: string) => { 
        const currentChats = get().userChats;
        const updatedChat: Chat = { ...currentChats[chatId], unseenMessages: [] }
        
        get().setUserChats({ ...currentChats, [chatId]: updatedChat })
     },

    createChat: async (userIds: string[]) => { 
        try {
            const chat = await chatRepositoryProvider.create(userIds);
            const currentChats = get().userChats;
            get().setUserChats({ [chat.id]: chat, ...currentChats });
        } catch (error: any | CustomError) {
            if (error.status === 401) {
                const logout = useAuthStore.getState().logout;
                logout();
            } else {
                console.log(error);
            }
        }
     },
}))