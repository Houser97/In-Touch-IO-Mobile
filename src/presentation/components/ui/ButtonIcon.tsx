import { Pressable, StyleSheet, View } from "react-native"
import { CustomIcon } from "./CustomIcon";
import { Text } from "react-native-paper";

interface Props {
    icon: string;
    iconColor: string;
    description: string;
    onClick: () => void;
}

export const ButtonIcon = ({ icon, iconColor, description, onClick }: Props) => {
    return (
        <Pressable style={style.container} onPress={onClick}>
            <View style={[style.iconContainer, { backgroundColor: iconColor }]}>
                <CustomIcon iconName={icon} size={25} style={style.icon} />
            </View>
            <Text style={style.description}>
                {description}
            </Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    container: {
        width: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        alignContent: 'center'
    },
    description: {
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center'
    }
});

