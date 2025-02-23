import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin, authRegister } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/helpers/storage.adapter";

export interface AuthState {
    token?: string;
    status: AuthStatus;
    user?: User;
    errorMessage: string;

    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, username: string) => Promise<boolean>;
    updateUser: (updatedUser: User) => void;
    checkStatus: () => Promise<boolean>;
    logout: () => Promise<void>;
    clearErrorMessage: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,
    errorMessage: '',

    login: async(email: string, password: string) => {
        const {status, user, errorMessage, token} = await authLogin(email, password);
        
        if(!user){
            set({status: 'unauthenticated', user, token, errorMessage });
            return false;
        }

        await StorageAdapter.setItem('token', token);
        
        set({status: 'authenticated', user, token, errorMessage });

        return true;
    },

    register: async(email: string, password: string, username: string) => {
        const {status, user, errorMessage, token} = await authRegister(email, password, username);
        
        if(!user){
            set({status: 'unauthenticated', user, token, errorMessage });
            return false;
        }

        await StorageAdapter.setItem('token', token);
        
        set({status: 'authenticated', user, token, errorMessage });

        return true;
    },

    updateUser: (updatedUser: User) => {
        set((state) => ({
            ...state,
            status: 'authenticated',
            user: updatedUser
        }));
    },

    checkStatus: async() => {
        const { user } = await authCheckStatus();
        if(!user) {
            set({status: 'unauthenticated', user, token: undefined, errorMessage: '' });
            return false;
        }

        set((state) => ({
            ...state,
            status: 'authenticated',
            user,
        }));
        return true;
    },

    logout: async () => {
        await StorageAdapter.removeItem('token');
        set({
            status: 'unauthenticated',
            token: undefined,
            user: undefined,
            errorMessage: '',
        });
    },

    clearErrorMessage: () => {
        set((state) => ({...state, errorMessage: ''}))
    }
}));