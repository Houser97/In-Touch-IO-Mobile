import { View } from "react-native";
import { Header } from "../../components/header/Header";
import { ChatCard } from "../../components/chat/cards/ChatCard";
import { FlatList } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useChatStore } from "../../store/chat/useChatStore";

export const HomeScreen = () => {

    const { formattedChat, getUserChats } = useChatStore();

    useEffect(() => {
        getUserChats();
    }, [])

    return(
        <View style={{flex: 1}}>
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
        </View>
    )
}

