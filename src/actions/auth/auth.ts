import inTouchIoApi from "../../config/api/inTouchIoApi";
import { UserMapper } from "../../infrastructure/mappers/user.mapper";

export const authLogin = async(email: string, password: string) => {
    try {
        const { data } = await inTouchIoApi.post('/auth/login', { email, password });

        const token = data.token
        const user = UserMapper.toEntity(data);

        return {
            user,
            status: 'authenticated',
            token,
            errorMessage: ''
        }

    } catch (error: any) {
        console.log(error)
        if (error instanceof TypeError) {
            return {
                status: 'unauthenticated',
                user: undefined,
                token: undefined,
                errorMessage: error.message,
            };
        }

        return {
            status: 'unauthenticated',
            user: undefined,
            token: undefined,
            errorMessage: error.response.data?.error || 'Wrong credentials'
        };
    }
}

export const authRegister = async(email: string, password: string, username: string) => {
    try {
        const { data } = await inTouchIoApi.post('/auth/register', { email, password, name: username });
        const user = UserMapper.toEntity(data);
        const token = data.token
        return {
            user,
            status: 'authenticated',
            token,
            errorMessage: ''
        }
    } catch (error: any) {
        return {
            status: 'unauthenticated',
            user: undefined,
            token: undefined,
            errorMessage: error.response.data?.error || 'Wrong credentials Register'
        };
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await inTouchIoApi.get('/auth');

        return {
            user: data.user
        }
    } catch (error) {
        console.log(error);
        return {
            user: undefined
        }
    }
}