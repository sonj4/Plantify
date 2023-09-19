import axios from '../../../utils/axios.js';
import uploadImageToFirebase from '../../../common/services/uploadImageToFirebase.js';

export const createPlant = async (token, plantData) => {
    try {
      const response = await axios.post('/admin/plants', plantData, {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.status === 201) {
        console.log('Plant created:', response.data);
        return response.data;
      } else {
        console.error('Error creating plant:', response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating plant: ", error);
      throw error;
    }
  };
  

  export const updatePlant = async (token, plantData) => {
    try {
        const response = await axios.put(`/admin/plants/${plantData.plantId}`, plantData, {
            headers: {
                Authorization: token
            }
        })
        if (response.status === 200) {
            console.log('Plant updated:', response.data);
            return response.data;
        } else {
            console.error('Error updating plant:', response.data.message);
            throw new Error(response.data.message);
        }
        
    } catch(error) {
        console.error("Error updating plant: ", error);
        throw error;
    }
}

export const deletePlant = async (token, plantId) => {
    try {
        const response = await axios.delete(`/admin/plants/${plantId}`, {
            headers: {
                Authorization: token
            }
        });

        if(response.status === 200) {
            console.log("Plant successfully deleted");
            return true;
        } else {
            console.error("Error deleting plant:", response.data.message);
            return false;
        }
    } catch(error) {
        console.error("Error while deleting plant: ", error);
        throw error;
    }
};
