import Plant from "../models/Plant.js";

export const getPlants = async (req, res) => {
    try {
        const plants = await Plant.find();
        res.status(200).json(plants);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while fetching the plants." });
    }
};

export const newPlant = async (req, res) => {
    const { name, imageUrl } = req.body;

    // Ensure both name and imageUrl are provided
    if (!name || !imageUrl) {
        return res.status(400).json({ message: "Name and image URL are required." });
    }

    try {
        // Create a new plant document in the database
        const plant = new Plant({
            name,
            imageUrl
        });

        // Save the new plant document
        await plant.save();

        res.status(201).json(plant);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while creating the plant." });
    }
};

export const updatePlant = async (req, res) => {
    const { plantId } = req.params;
    const { name, imageUrl } = req.body;

    try {
        const plant = await Plant.findById(plantId);

        if (!plant) {
            return res.status(404).json({ message: "Plant not found." });
        }

        if (name) plant.name = name;
        if (imageUrl) plant.imageUrl = imageUrl;

        await plant.save();

        res.status(200).json(plant);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while updating the plant." });
    }
};

// export const identfiyPlantAdmin = async (req, res) => {
//     const {plantId} = req.params;
//     const {name, careInstructions, longitude, latitude} = req.body;


//     try {
//         const plant = await Plant.findById(plantId);

//         if (!plant) {
//             return res.status(404).json({ message: "Plant not found." });
//         }

//         plant.name = name;
//         plant.careInstructions = careInstructions;
        

//     } catch(error) {
//         console.log(error);
//         res.status(500).json({ message: "An error occurred while identifying the plant." });
//     }
// }

export const identifyPlantAdmin = async (req, res) => {
    const { plantId } = req.params;
    const { name, careInstructions, longitude, latitude } = req.body;

    try {
        const plant = await Plant.findById(plantId);

        if (!plant) {
            return res.status(404).json({ message: "Plant not found." });
        }

        plant.name = name;
        plant.careInstructions = careInstructions;
        plant.locations = [{ type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] }];
        plant.identificationStatus = 'Identified';

        await plant.save();

        res.status(200).json(plant);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while identifying the plant." });
    }
}


export const deletePlant = async (req, res) => {
    const { plantId } = req.params;

    try {
        const plant = await Plant.findByIdAndDelete(plantId);

        if (!plant) {
            return res.status(404).json({ message: "Plant not found." });
        }

        res.status(200).json({ message: "Plant successfully deleted." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while deleting the plant." });
    }
};
