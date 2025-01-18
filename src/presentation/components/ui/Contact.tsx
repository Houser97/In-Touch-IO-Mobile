import { Image, StyleSheet, View } from "react-native";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useChatStore } from "../../store/chat/useChatStore";
import { Text } from "react-native-paper";

export const Contact = ({ picture = '', name = '', id = '', added = false }) => {

  const { user } = useAuthStore();
  const { createChat } = useChatStore();

  const handleClick = async () => {
    createChat([user!.id, id]);
  }

  return (
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
        <Text>{name}</Text>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1, // Importante para que en flatlist ocupen toda la columna
        // Los margenes se usan para efecto de gap en FlatList
        marginHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#E7EAE5',
        borderRadius: 5,
        padding: 10,
        gap: 20,
        width: 200
    }
})
