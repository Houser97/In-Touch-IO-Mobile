import { useLayoutEffect, useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useChatStore } from "../../store/chat/useChatStore";
import { useMessageStore } from "../../store/messages/useMessageStore";
import { View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigator";
import { MessageHeader } from "../../components/messages/MessageHeader";
import { FlatList } from "react-native-gesture-handler";
import { Message } from "../../components/messages/Message";
import { MessageInput } from '../../components/messages/MessageInput';
import { DateAdapter } from "../../../config/helpers/date.adapter";
import { Loader } from "../../components/ui/Loader";

export const ChatScreen = () => {

    const { chat } = useChatStore();
    const { messages, isLoading, hasMoreMessages, getMessagesPagination } = useMessageStore();
    const { user } = useAuthStore();
    
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
  
    const userId = user?.id;
    const friendsData = chat.users.filter(user => user.id != userId)[0];
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTitle: () => (
            <MessageHeader picture={friendsData.pictureUrl} name={friendsData.name} />
        )
      });
    }, [])
  
    return (
      <View style={{flex: 1, position: 'relative'}}>
        { isLoading && <Loader />}
        <FlatList
            data={messages}
            keyExtractor={(message) => `${message.id}`}
            numColumns={1}
            style={{paddingTop: -60, flex: 1}}
            renderItem={({item}) => 
                <Message 
                    image={item.image} 
                    hour={DateAdapter.toHour(item.createdAt.toString())}
                    owner={item.sender === user?.id}
                    content={item.content}
                />
            }
            onEndReachedThreshold={0.6}
            onEndReached={() => {
              if(hasMoreMessages) {
                getMessagesPagination(chat.id);
              }
            }}
            inverted={true}
            showsVerticalScrollIndicator={false}>
        </FlatList>
        <MessageInput />
      </View>
    )
}