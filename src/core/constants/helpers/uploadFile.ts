import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../config/firebase.config';
import sharp from 'sharp';

export const UploadFileToServer = async (file: unknown) => {
	const fileBuffer = await sharp(file.buffer).resize({ width: 200, height: 200, fit: 'cover' }).toBuffer();
	const storageRef = ref(storage, `images/${file.originalname} - ${new Date().getTime()}`);
    const metaData = {
		contentType: file.mimetype
    };

    try {
        await uploadBytesResumable(storageRef, fileBuffer, metaData);
        const url = await getDownloadURL(storageRef);
        return {
            ref: storageRef,
            url
        }
    } catch (error) {
        console.log('error', error);
        
        return error.message;
    }

}
