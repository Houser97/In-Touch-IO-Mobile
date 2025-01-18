import { useMemo, useState } from "react";
import { View } from "react-native"
import { useChatStore } from "../../store/chat/useChatStore";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useUsers } from "../../hooks/useUsers";
import { Loader } from "../../components/ui/Loader";
import { Contact } from "../../components/ui/Contact";
import { FlatList } from "react-native-gesture-handler";
import { InputModeEnum, TextInputIcon } from "../../components/ui/TextInputIcon";

export const SearchScreen = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const { userChats } = useChatStore();
    const { user } = useAuthStore();

    const { users, isLoading, getByNameOrEmail } = useUsers();

    const AddedFriends = useMemo(() => {
        const chatIds = Object.keys(userChats);
        const UserId = user?.id;
        const friendList = chatIds.reduce((acc: string[], chatId: string) => {
            const { users } = userChats[chatId];
            const { id: friendId } = users.find((user) => user.id !== UserId)!;
            return [...acc, friendId];
        }, []);
        return friendList;
    }, [Object.keys(userChats).length, user?.id]);

  return (
    <View style={{flex: 1, padding: 10}}>
        <TextInputIcon 
            inputMode={InputModeEnum.outlined} 
            value={searchQuery}
            placeholder="Search Users"
            onPress={() => getByNameOrEmail(searchQuery)}
            onChange={setSearchQuery} 
        />


        <FlatList
            data={users}
            keyExtractor={(user) => `${user.id}`}
            numColumns={2}
            style={{flex: 1}}
            renderItem={({item}) => 
                <Contact 
                    picture={item.pictureUrl} 
                    name={item.name}
                />
            }
            onEndReachedThreshold={0.6}
            showsVerticalScrollIndicator={false}>
        </FlatList>

    </View>
  )
}
