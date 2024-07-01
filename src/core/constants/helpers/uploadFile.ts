import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../config/firebase.config';
import sharp from 'sharp';
import { type FileUploadToServer } from '../../types';

export const UploadFileToServer = async (file: FileUploadToServer) => {
	try {
		const metaData = {
			contentType: file.mimetype
		};
		const format = metaData.contentType.split('/')[1];

		console.log('file', file);
		console.log('metaData', metaData);
		const fileBuffer = await sharp(file.buffer).resize({ width: 200, height: 200, fit: 'cover' }).toBuffer();
		console.log('fileBuffer', fileBuffer);

		const storageRef = ref(storage, `images/${file.originalname}_${new Date().getTime()}${format}`);

		await uploadBytesResumable(storageRef, fileBuffer, metaData);
		const url = await getDownloadURL(storageRef);
		return {
			ref: storageRef,
			url
		};
	} catch (error) {
		console.log('error', error);

		return error.message;
	}
};
