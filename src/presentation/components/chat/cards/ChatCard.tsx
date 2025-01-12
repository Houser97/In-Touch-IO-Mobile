import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Image, Pressable, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { RootStackParams } from "../../../navigator/StackNavigator"
import { useChatStore } from "../../../store/chat/useChatStore"
import { useMessageStore } from "../../../store/messages/useMessageStore"
import { useContext } from "react"
import { SocketContext } from "../../../providers/SocketProvider"

interface Props {
    picture: string,
    name: string,
    chatId: string,
    lastMessage: string | boolean,
    unseen: string[],
    hour: string,
    senderId: string,
  }
  
export const ChatCard = ({ picture, name, chatId, lastMessage, unseen, hour, senderId }: Props) => {
    
    const { selectChat, clearUnseenMessages } = useChatStore();
    const { getMessages,  clearMessages, updateMessagesStatus } = useMessageStore();
    const { joinChat } = useContext(SocketContext);

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const navigate = () => {
        clearMessages();
        selectChat(chatId);
        joinChat(chatId);
        getMessages(chatId);
        updateMessagesStatus(unseen);
        clearUnseenMessages(chatId);
        navigation.navigate('ChatScreen')
    }

    return (
        <Pressable
            style={{flex: 1}}
            onPress={navigate}
        >
            <View style={style.container}>
                    <Image 
                        source={{uri: picture}}
                        style={[
                            {
                                width: 50,
                                height: 50,
                                borderRadius: 50
                            }
                        ]}
                    />
                    <View style={{flex: 1}}>
                        <View style={style.contentContainer}>
                            <Text style={{fontWeight: '800', fontSize: 17}}>{name}</Text>
                            <Text ellipsizeMode="tail" numberOfLines={1}>{lastMessage}</Text>
                        </View>
                    </View>
                    <View style={[style.contentContainer, {justifyContent: 'flex-end'}]}>
                        <Text>{hour}</Text>
                        {unseen.length > 0 && <Text style={style.unseenMessages}>{unseen.length}</Text>}
                    </View>
            </View>
        </Pressable>
    )
  }

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingInline: 10,
        paddingBlock: 12,
        gap: 10
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    unseenMessages: {
        backgroundColor: '#3A9BDC',
        color: 'white',
        borderRadius: 50,
        width: 25,
        height: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'center'
    }
})