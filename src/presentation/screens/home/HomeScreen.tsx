import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/header/Header";
import { ChatCard } from "../../components/chat/cards/ChatCard";
import { FlatList } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useChatStore } from "../../store/chat/useChatStore";
import { CustomIcon } from "../../components/ui/CustomIcon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigator";

export const HomeScreen = () => {

    const { formattedChat, getUserChats } = useChatStore();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
        getUserChats();
    }, [])

    return(
        <View style={{flex: 1, position: 'relative'}}>
            <Header />
            <FlatList
                data={formattedChat}
                keyExtractor={(chat) => `${chat.id}`}
                numColumns={1}
                renderItem={({item}) => 
                    <ChatCard 
                        picture={item.pictureUrl} 
                        name={item.name}
                        lastMessage={item.content}
                        hour={item.formattedTime}
                        unseen={item.unseen}
                        chatId={item.id}
                        senderId={item.senderId} />}
                onEndReachedThreshold={0.6}
                showsVerticalScrollIndicator={false}>
            </FlatList>

            <TouchableOpacity style={style.searchButton} onPress={() => navigation.navigate('SearchScreen')}>
                <CustomIcon iconName="add" size={25}></CustomIcon>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    searchButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 15,
        backgroundColor: '#b3b3b3',
        borderRadius: 50,
    }
})