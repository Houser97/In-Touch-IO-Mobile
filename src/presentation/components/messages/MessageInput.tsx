import { useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper"
import { useAuthStore } from "../../store/auth/useAuthStore";
import { SocketContext } from "../../providers/SocketProvider";
import { OptionsModal } from "./OptionsModal";

import { CustomIcon } from "../ui/CustomIcon";

export const MessageInput = () => {

    const { user } = useAuthStore();
    const { sendMessage } = useContext(SocketContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [message, setMessage] = useState('');

    const handleMessageCreation = (image: string) => {
        setMessage('');    
        sendMessage(user!.id, message, image as string);
    }

    return (
        <View style={style.container} >
            <View style={style.inputContainer}>

                <TouchableOpacity style={style.photoButton} onPress={async () => {
                    setIsModalOpen(true)
                }}>
                    <CustomIcon iconName="attach-outline" size={25} />
                </TouchableOpacity>

                <TextInput 
                                placeholder="Message..."
                                placeholderTextColor='#909090'
                                value={message}
                                onChangeText={setMessage}
                                mode="outlined"
                                style={{flex: 1}}
                                outlineColor="black"
                                textAlign="center"
                                textAlignVertical="center"
                                outlineStyle={{
                                    flex: 1,
                                    paddingHorizontal: 18,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingVertical: 0,
                                    borderColor: '#d0d0d0',
                                    backgroundColor: 'white',
                                }}
                />
            </View>
            <TouchableOpacity onPress={() => handleMessageCreation('')}>
                <CustomIcon iconName="paper-plane-outline" size={25} />
            </TouchableOpacity>

            <OptionsModal 
                isVisible={isModalOpen} 
                sendMessage={handleMessageCreation}
                onClose={() => setIsModalOpen(false)} 
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        height: 70,
        padding: 7,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        gap: 10,

    },
    photoButton: {

    }
});