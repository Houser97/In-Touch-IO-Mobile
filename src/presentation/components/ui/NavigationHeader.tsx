import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper";

interface Props {
    title: string;
}

export const NavigationHeader = ({title}: Props) => {
  return (
    <View style={style.header} >
      <Text style={style.text}>{title}</Text>
    </View>
  )
}

const style = StyleSheet.create({
    header: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'transparent'
    },
    text: {
        fontWeight: '600'
    }
})