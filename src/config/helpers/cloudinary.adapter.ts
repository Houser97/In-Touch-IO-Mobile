import axios from "axios";
import { CustomError } from "../../infrastructure/errors/custom.error";

const UPLOAD_PRESET = 'InTouch'; // Configurado como unsigned
const CLOUD_NAME = 'dluwqcce9';

const cloudinaryApi = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
});

export class ImageStorageAdapter {
    static uploadImage = async (fileUri: string) => {
        const formData = new FormData();
        
        const file = {
            uri: fileUri,
            type: 'image/jpeg',
            name: fileUri.split('/').pop(),
        };

        formData.append('file', file as any);
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const { data } = await cloudinaryApi.post('', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const imageUrl = data.secure_url;
            const publicId = data.public_id;
            return { imageUrl, publicId };
        } catch (error) {
            console.error('Error al subir la imagen a Cloudinary:', error);
            throw CustomError.formatError(error);
        }
    }
}
