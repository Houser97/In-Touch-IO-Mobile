import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { RootStackParams } from "../../navigator/StackNavigator";
import { NavigationHeader } from "../../components/ui/NavigationHeader";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { Button, TextInput } from "react-native-paper";
import { CustomIcon } from "../../components/ui/CustomIcon";
import { OptionsModal } from "../../components/messages/OptionsModal";
import { useUsers } from "../../hooks/useUsers";
import { ImageStorageAdapter } from "../../../config/helpers/cloudinary.adapter";

export const UserScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { user } = useAuthStore();
    const { updateUser } = useUsers();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [username, setUsername] = useState(user!.name);
    const [pictureId, setPictureId] = useState('default');
    const [image, setImage] = useState(user!.pictureUrl);

    const udpateImage = (image: string) => {
      setImage(image);
      setPictureId(user!.pictureId);
    }
    
    const udpate = async () => {
      const { id } = user!;
      let newImage = image;
      let newPictureId = user!.pictureId;
      if(pictureId !== 'default') {
          const result = await ImageStorageAdapter.uploadImage(image);
          newImage = result.imageUrl;
          newPictureId = result.publicId
      }
      await updateUser(id, username, newImage, newPictureId, pictureId );
      navigation.goBack();
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: () => (
                <NavigationHeader title="Settings" />
            )
        });
    }, [])

  return (
    <View style={style.container}>
      <View>
        <Image 
            source={{
                uri: image
            }}
            style = {style.image}
            
        />

        <TouchableOpacity onPress={()=>{ setIsModalOpen(true) }} style={style.iconButton}>
            <CustomIcon iconName="camera" size={25} style={{marginHorizontal: 1}} />
        </TouchableOpacity>
      </View>

      <TextInput 
          label={'Username'}
          placeholderTextColor='#909090'
          value={username}
          onChangeText={setUsername}
          mode='outlined'
          style={style.textInput}
          outlineColor="black"
          outlineStyle={[style.textInput]}
      />

      <View style={{marginTop: 10}}>
          <Button 
          mode="contained"
          textColor="white"
          
          style={style.button}
          onPress={udpate}>
              Update
          </Button>
      </View>


      <OptionsModal 
          isVisible={isModalOpen} 
          onAction={udpateImage}
          onClose={() => setIsModalOpen(false)} 
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  textInput: {
    width: '100%',
    borderColor: 'black',
  },
  iconButton: {
    backgroundColor: '#d9d9d9', 
    marginHorizontal: 10, 
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    borderRadius: 5, 
    backgroundColor: '#24a0ed'
}
});