import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useChatStore } from "../../store/chat/useChatStore";
import { Text } from "react-native-paper";
import { CustomIcon } from "./CustomIcon";

const AddedFriend = () => {
  return (
    <Text style={style.addedText}>
      Added
    </Text>
  )
}

export const Contact = ({ picture = '', name = '', id = '', added = false }) => {

  const { user } = useAuthStore();
  const { createChat } = useChatStore();

  const handleClick = async () => {
    createChat([user!.id, id]);
  }

  return (
    <View style={style.container}>
      <Image
        source={{ uri: picture }}
        style={[
          {
            width: 50,
            height: 50,
            borderRadius: 50
          }
        ]}
      />
      <View style={style.dataContainer}>
        <Text>{name}</Text>

        {added
          ? <AddedFriend />
          : <TouchableOpacity onPress={handleClick} style={style.button}>
            <CustomIcon iconName="add" size={25} style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>Add User</Text>
          </TouchableOpacity>
        }


      </View>
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
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    gap: 20,
    width: 200
  },
  dataContainer: {
    flex: 1,
    gap: 10
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4169E1',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    flex: 0
  },
  addedText: {
    flex: 1,
    width: '100%',
    backgroundColor: '#6FC276',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})
