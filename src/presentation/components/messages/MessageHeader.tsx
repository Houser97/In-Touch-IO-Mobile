import { Image, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper";

interface Props {
    picture: string;
    name: string
}

export const MessageHeader = ({picture, name}: Props) => {
  return (
    <View style={style.header} >
      <Image 
        source={{uri: picture}}
        style={[
            {
                width: 40,
                height: 40,
                borderRadius: 50
            }
        ]}
      />
      <Text style={style.text}>{name}</Text>
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