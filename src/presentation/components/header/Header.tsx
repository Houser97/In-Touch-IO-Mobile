import { Image, Pressable, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { useAuthStore } from "../../store/auth/useAuthStore"
import { CustomIcon } from "../ui/CustomIcon";
import { ModalTopAnimation } from "../ui/ModalTopAnimation";
import { useState } from "react";
import { useAnimation } from "../../hooks/useAnimation";

export const Header = () => {

    const { user } = useAuthStore();
    const { animatedTop, startMovingTopPosition } = useAnimation();

    const [isModalVisible, setModalIsVisible] = useState(false);


    const resizeBox = (toValue: number, initialPosition: number) => {
        toValue >= 0 && setModalIsVisible(true);
        startMovingTopPosition({
            initialPosition: initialPosition,
            duration: 300,
            toValue,
            callback: () => toValue < 0 && setModalIsVisible(false)
        })
        }
  return (
    <View style={style.container}>
        <View style={style.textContainer}>
            <Text style={{fontSize: 14}}>Hello {user?.name},</Text>
            <Text variant="displaySmall" style={{fontWeight: '900'}}>In-Touch IO</Text>
        </View>

        <Pressable style = {style.imageContainer} onPress={() => resizeBox(1, -300)}>
            <Image 
                source={{
                    uri: user?.pictureUrl
                }}
                style = {[
                    {
                    width: 55,
                    height: 55,
                    borderRadius: 50
                    }
                ]}
                
            />
   
            <CustomIcon size={25} iconName="ellipsis-vertical" />

        </Pressable>

        <ModalTopAnimation scale={animatedTop} isVisible={isModalVisible} onPress={resizeBox}></ModalTopAnimation>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#CACACA',
        padding: 10,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    imageContainer: {
        flexDirection: 'row',
        gap: 0
    }
})