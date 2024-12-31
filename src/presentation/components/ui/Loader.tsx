import { StyleSheet, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"

export const Loader = () => {
    return (
        <View style={style.loader}>
            <ActivityIndicator></ActivityIndicator>
        </View>
    )
}

const style = StyleSheet.create({
    loader: {
        width: '100%',
        paddingBlock: 10,
        backgroundColor: 'transparent',
        position: 'absolute',
        alignItems: 'center', 
        justifyContent: 'center',
    }
});