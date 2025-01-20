import { useLayoutEffect, useMemo, useState } from "react";
import { View } from "react-native"
import { useChatStore } from "../../store/chat/useChatStore";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useUsers } from "../../hooks/useUsers";
import { Loader } from "../../components/ui/Loader";
import { Contact } from "../../components/ui/Contact";
import { FlatList } from "react-native-gesture-handler";
import { InputModeEnum, TextInputIcon } from "../../components/ui/TextInputIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigator";
import { MessageHeader } from "../../components/messages/MessageHeader";
import { NavigationHeader } from "../../components/ui/NavigationHeader";

export const SearchScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: () => (
                <NavigationHeader title="Search Users" />
            )
        });
    }, [])

    const [searchQuery, setSearchQuery] = useState('');

    const {top} = useSafeAreaInsets();

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
            style={{paddingTop: top + 20}}
            renderItem={({item}) => 
                <Contact 
                    picture={item.pictureUrl} 
                    name={item.name}
                    added={AddedFriends.includes(item.id)}
                    id={item.id}
                />
            }
            onEndReachedThreshold={0.6}
            showsVerticalScrollIndicator={false}>
        </FlatList>

    </View>
  )
}
