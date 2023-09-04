import storage from '@react-native-firebase/storage';

async function uploadImageToFirebase(filePath, folder) {
    if (!filePath) return null;

    const imageName = filePath.split('/').pop();
    const reference = storage().ref(`${folder}/` + imageName);

    try {
        await reference.putFile(filePath);
        const url = await reference.getDownloadURL();
        return url;
    } catch (error) {
        console.error('Error during upload:', error);
        throw error;
    }
}

export default uploadImageToFirebase;
