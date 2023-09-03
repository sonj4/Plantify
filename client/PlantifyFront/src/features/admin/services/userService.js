import axios from '../../../utils/axios.js';

// export const fetchUsers = async () => {
//     const {token, isAdmin} = useAuth();
//   try {
//     const response = await axios.get('/admin/users', {
//       headers: {
//         Authorization:token 
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };

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
