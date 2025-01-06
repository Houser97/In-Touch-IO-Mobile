import { Image, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

export const Message = ({ hour = '', owner = false, content = '', image = '' }) => {
    return (
    <View style={{flex: 1, display: 'flex', flexDirection: 'column', position: 'relative'}}>
        <View style={[
            style.global,
            owner ? style.owner : style.friend,
            ]}>
        {image.length > 0 && <Image source={{uri: image}} style={style.image} />}
        {content.length > 0 &&         
            <Text
                style={[
                    owner ? style.textOwner : style.textFriend,
                ]}
            >
                {content}
            </Text>
        }

        <Text
            style={[
                style.hour,
                owner ? style.textOwner : style.textFriend,
            ]}
        >{hour}</Text>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
    global: {
        borderRadius: 10,
        position: 'relative',
        marginBlock: 4,
        maxWidth: '75%',
        minWidth: 150,
        paddingBottom: 30,
        alignSelf: 'flex-start',
        alignItems: 'baseline',
        padding: 10
    },
    owner: {
        right: 10,
        alignSelf: 'flex-end',
        backgroundColor: "#663399",
        justifyContent: 'center'
    },
    friend: {
        left: 10,
        alignSelf: 'flex-start',
        backgroundColor: "#D3D3D3"
    },
    textOwner: {
        color: 'white'
    },
    textFriend: {
        color: 'black'
    },
    hour: {
        position: 'absolute',
        bottom: 5,
        right: 10
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 135 / 76
    }
    
})