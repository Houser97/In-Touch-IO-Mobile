import { create } from "zustand";
import { Message } from "../../../domain/entities/message.entity";
import { messageRepositoryProvider } from "../../providers/repositories/message-repository.provider";
import { CustomError } from "../../../infrastructure/errors/custom.error";
import { useAuthStore } from "../auth/useAuthStore";

const limit = 20;

export interface MessageState {
    messages: Message[];
    idUnseenMessages: string[];
    isLoading: boolean;
    hasMoreMessages: boolean;
    page: number;

    setIdUnseenMessages: () => void;
    setMessages: (newMessage: Message) => void;
    clearMessages: () => void;
    setHasMoreMessages: () => void;
    getMessages: (chatId: string) => Promise<void>;
    updateMessagesStatus: (ids: string[]) => Promise<void>;
    getMessagesPagination: (chatId: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>()((set, get) => ({
    messages: [],
    idUnseenMessages: [],
    isLoading: true,
    hasMoreMessages: false,
    page: 2,

    setHasMoreMessages: () => { throw new Error('setHasMoreMessages not implemented') },

    setIdUnseenMessages: () => { throw new Error('setIdUnseenMessages not implemented') },

    setMessages: (newMessage: Message) => { 
        const messages = get().messages;
        set((state) => ({
            ...state, 
            messages: [newMessage, ...messages]
        }));
     },

    clearMessages: () => {
        set((state) => ({
            ...state, 
            messages: []
        }));
    },

    getMessages: async (chatId: string) => { 
        set((state) => ({...state, isLoading: true}));
        try {
            const {messages: currentMessages} = get();
            const { messages, next } = await messageRepositoryProvider.getMessages(chatId, 1, limit);
            const reversedMessage = messages.reverse()
            set((state) => ({
                ...state, 
                hasMoreMessages: next !== null,
                messages: [...currentMessages, ...reversedMessage]
            }));
        } catch (error: any | CustomError) {
            console.log(error.status);
            if (error.status === 401) {
                const logout = useAuthStore.getState().logout;
                logout();
            } else {
                console.log(error);
            }
        } finally {
            set((state) => ({...state, isLoading: false}));
        }
     },

    updateMessagesStatus: async (ids: string[]) => { 
        await messageRepositoryProvider.updateMessageSeenStatus(ids);
     },

    getMessagesPagination: async (chatId: string) => {

        try {
            const {page, messages: currentMessages} = get();
            const { messages, next } = await messageRepositoryProvider.getMessages(chatId, page, limit);
            const reversedMessage = messages.reverse()

            set((state) => ({
                ...state, 
                page: page + 1, 
                hasMoreMessages: next !== null,
                messages: [...currentMessages, ...reversedMessage]
            }));

        } catch (error: any | CustomError) {
            console.log(error.status);
            if (error.status === 401) {
                const logout = useAuthStore.getState().logout;
                logout();
            } else {
                console.log(error);
            }
        }
    },
}));