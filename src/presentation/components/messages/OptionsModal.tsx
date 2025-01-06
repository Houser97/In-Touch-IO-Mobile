import { Modal, Pressable, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { CustomIcon } from "../ui/CustomIcon"
import { ButtonIcon } from "../ui/ButtonIcon"
import { CameraAdapter } from "../../../config/helpers/camera.adapter"
import { ImageStorageAdapter } from "../../../config/helpers/cloudinary.adapter"

interface Props {
    isVisible: boolean;
    sendMessage: (imageUrl: string) => void;
    onClose: () => void;
}

export const OptionsModal = ({ isVisible, sendMessage , onClose }: Props) => {

    
    const pictureFromCamera = async () => {
        const photos = await CameraAdapter.takePicture();
        if(photos.length){
            const result = await ImageStorageAdapter.uploadImage(photos[0]);
            const { imageUrl } = result;
            sendMessage(imageUrl);
            onClose();
        }
    }

    const pictureFromGallery = async () => {
        const photos = await CameraAdapter.getPicturesFromLibrary();
        if(photos.length){
            const result = await ImageStorageAdapter.uploadImage(photos[0]);
            const { imageUrl } = result;
            sendMessage(imageUrl);
            onClose();
        }
    }
    

    return(
        <Modal visible={isVisible} animationType="fade" transparent={true}>
            <View style={style.modalContent}>
                <View style={style.titleContainer}>
                    <Text>Modal</Text>
                    <Pressable onPress={onClose}>
                        <CustomIcon iconName="close-outline" size={25} />
                    </Pressable>
                </View>

                <View style={style.body}>
                    <ButtonIcon 
                        icon="camera-outline" 
                        iconColor="purple" 
                        description="Camera"
                        onClick={pictureFromCamera} 
                    />

                    <ButtonIcon 
                        icon="image-outline" 
                        iconColor="green" 
                        description="Gallery"
                        onClick={pictureFromGallery} 
                    />
                </View>
            </View>
        </Modal>
    )

}

const style = StyleSheet.create({
    modalContent: {
        height: '25%',
        width: '100%',
        backgroundColor: 'white',
        bottom: 0,
        position: 'absolute'
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#DDDDDD',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        flexDirection: 'row'
    }
});