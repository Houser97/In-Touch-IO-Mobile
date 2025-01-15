import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-paper";
import { useChatStore } from "../../store/chat/useChatStore";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useUsers } from "../../hooks/useUsers";
import { Loader } from "../../components/ui/Loader";
import { Contact } from "../../components/ui/Contact";
import { FlatList } from "react-native-gesture-handler";
import { CustomIcon } from "../../components/ui/CustomIcon";

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
        <TextInput 
            placeholder="Search Users..."
            placeholderTextColor='#909090'
            value={searchQuery}
            onChangeText={setSearchQuery}
            mode="outlined"
            style={{flex: 0}}
            outlineColor="black"
            textAlign="center"
            textAlignVertical="center"
            outlineStyle={{
                flex: 1,
                paddingHorizontal: 18,
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 0,
                borderColor: 'black',
                backgroundColor: 'white',
            }}
        />

        <TouchableOpacity onPress={() => getByNameOrEmail(searchQuery)}>
            <CustomIcon iconName="paper-plane-outline" size={25} />
        </TouchableOpacity>

        <FlatList
            data={users}
            keyExtractor={(user, index) => `${user.id}`}
            numColumns={2}
            style={{flex: 1, backgroundColor: 'green'}}
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
