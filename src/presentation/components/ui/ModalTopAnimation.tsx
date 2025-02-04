import { Animated, Modal, Pressable, SafeAreaView, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { CustomIcon } from "./CustomIcon";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigator";
import { useChatStore } from "../../store/chat/useChatStore";

interface Props {
    scale: Animated.Value;
    isVisible: boolean;
    onPress: (value: number, initialPosition: number) => void;
}

export const ModalTopAnimation = ({scale, isVisible, onPress}: Props) => {
    const { logout } = useAuthStore();
    const { setUserChats } = useChatStore();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const options = [
        {
            title: 'Settings',
            icon: 'settings',
            action: () => navigation.navigate('UserScreen'),
        },
        {
            title: 'Logout',
            icon: 'log-out',
            action: () => { 
                setTimeout(function() {
                    logout()
                    setUserChats({})
                }, 500);
            }
        }
    ]
    return (
        <Modal transparent visible={isVisible} >
            <SafeAreaView style={style.container} onTouchStart={() => onPress(-400, 0)} >
                <Animated.View 
                    style={[
                        style.popup, 
                        {transform: [{translateY: scale}]}
                    ]}>
                    {options.map((o,i) => (
                        <Pressable 
                            key={i} 
                            style={style.button}
                            onPress={o.action}
                        >
                            <CustomIcon 
                                iconName={o.icon} 
                                size={25} 
                                style={{height: 25, width: 25}} 
                            />

                            <Text>{o.title}</Text>
                        </Pressable>
                    ))}
                </Animated.View>
            </SafeAreaView>
        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        top: 76, 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden'
    },
    popup: {
        position: 'absolute',
        backgroundColor: '#EBECF0',
        borderColor: 'green',
        padding: 10,
        top: 0,
        right: 0,
        width: 150,
        borderBottomLeftRadius: 10,
        gap: 10,
    },
    button: {
        flexDirection: 'row',
        gap: 10
    }
});