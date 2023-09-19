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
    const { userId, name, instructions, longitude, latitude, imageUrl } = req.body;

    if (!name || !imageUrl || !longitude || !latitude || !instructions) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const plant = new Plant({
            name,
            imageUrl,
            careInstructions: instructions,
            locations: [{ type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] }],
            identificationStatus: 'Identified',
            owner: userId 
        });

        await plant.save();
        res.status(201).json(plant);

    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "An error occurred while creating the plant." });
    }
};


export const updatePlant = async (req, res) => {
    console.log('test')
    const { plantId } = req.params;
    const { name, imageUrl, instructions, longitude, latitude } = req.body;

    try {
        const plant = await Plant.findById(plantId);

        if (!plant) {
            return res.status(404).json({ message: "Plant not found." });
        }

        if (name) plant.name = name;
        if (imageUrl) plant.imageUrl = imageUrl;
        if (instructions) plant.careInstructions = instructions;
        if (longitude && latitude) {
            plant.locations = [{ type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] }];
        }
        console.log(plant)
        await plant.save();

        res.status(200).json(plant);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while updating the plant." });
    }
};




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
