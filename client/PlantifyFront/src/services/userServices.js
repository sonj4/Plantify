import axios from '../utils/axios';

export const getPlants = async (token) => {
    try {
        const response = await axios.get('/user/plants', {
          headers: {
            Authorization: token,
          },
        });
        return response.data;
      } catch (error) {
        console.log("Error while fetching plants:", error);
      } 
}