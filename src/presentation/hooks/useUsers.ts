import { useState } from "react"
import { User } from "../../domain/entities/user.entity";
import { userRepositoryProvider } from "../providers/repositories/user-repository.provider";
import { useAuthStore } from "../store/auth/useAuthStore";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { updateUser: updateAuthUser } = useAuthStore();


    const getByNameOrEmail = async (value: string) => {
        setIsLoading(true);
        try {
            const users = await userRepositoryProvider.getByNameOrEmail(value);
            setUsers(users);
        } catch (error) {
            // TODO: Agregar mensaje
        } finally {
            setIsLoading(false);
        }

    }

    const updateUser = async (id: string, name: string, pictureUrl: string, newPictureId: string, oldPictureId: string) => {
        try {
            const user = await userRepositoryProvider.update(id, name, pictureUrl, newPictureId, oldPictureId);
            updateAuthUser(user);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        users,
        isLoading,

        getByNameOrEmail,
        updateUser
    }
}