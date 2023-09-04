import axios from '../../../utils/axios.js';
import uploadImageToFirebase from '../../../common/services/uploadImageToFirebase.js';

export const fetchUsers = async (token) => {
    try {
        const response = await axios.get('/admin/users', {
            headers: {
                Authorization: token
            }
        });

        if (response.status === 403) {
            throw new Error("Access denied. Admin privileges are required.");
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const createUser = async (token, userData) => {
    console.log(userData)
    try {
        const response = await axios.post('/admin/users', userData, {
            headers: {
                Authorization: token
            }
        })

        if (response.status === 201) {
            console.log('User created:', response.data.user);
            return response.data.user;
        } else {
            console.error('Error creating user:', response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    } 
}

export const updateUser = async (token, userData) =>{
    console.log("Edit user: ", userData);

    try {
        const response = await axios.put(`/users/${userData._id}`, userData, {
            headers: {
                Authorization: token
            }
        })
        if (response.status === 200 || response.status === 204) {
            console.log('User updated:', response.data.user);
            return response.data.user;
        } else {
            console.error('Error updating user:', response.data.message);
            throw new Error(response.data.message);
        }
        
    } catch(error) {
        console.error("Error updating user: ", error);
        throw error;
    }
}
