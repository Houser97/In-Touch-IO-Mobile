import { Image, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { useAuthStore } from "../../store/auth/useAuthStore"

export const Header = () => {

    const { user } = useAuthStore();
  return (
    <View style={style.container}>
        <View style={style.textContainer}>
            <Text style={{fontSize: 14}}>Hello {user?.name},</Text>
            <Text variant="displaySmall" style={{fontWeight: '900'}}>In-Touch IO</Text>
        </View>
        
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
    }
})