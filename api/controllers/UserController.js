import Plant from "../models/Plant.js";

export const getPlant = async (req, res) => {
    const { plantId } = req.params;

    try {
        const plant = await Plant.findOne({ _id: plantId, owner: req.user._id });

        if (!plant) {
            return res.status(404).json({ message: "Plant not found." });
        }

        res.status(200).json(plant);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while fetching the plant." });
    }
};

export const getPlants = async (req, res) => {
    try {
        const plants = await Plant.find({ owner: req.user._id });
        res.status(200).json(plants);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while fetching the plants." });
    }
};

export const newPlant = async (req, res) => {
    const { imageUrl  } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ message: "Image URL is required." });
    }

    try {
        const plant = new Plant({ owner: req.user._id, imageUrl: imageUrl });
        await plant.save();

        res.status(201).json(plant);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while creating the plant." });
    }
};

export const updatePlant = async (req, res) => {
    const { plantId } = req.params;
    const { name, imageUrl, identificationStatus, careInstructions } = req.body;

    try {
        const plant = await Plant.findOne({ _id: plantId, owner: req.user._id });

        if (!plant) {
            return res.status(404).json({ message: "Plant not found." });
        }

        if (name) plant.name = name;
        if (imageUrl) plant.imageUrl = imageUrl;
        if (identificationStatus) plant.identificationStatus = identificationStatus;
        if (careInstructions) plant.careInstructions = careInstructions;

        await plant.save();

        res.status(200).json(plant);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while updating the plant." });
    }
};

export const deletePlant = async (req, res) => {
    const { plantId } = req.params;

    try {
        const plant = await Plant.findOneAndDelete({ _id: plantId, owner: req.user._id });

        if (!plant) {
            return res.status(404).json({ message: "Plant not found." });
        }

        res.status(200).json({ message: "Plant successfully deleted." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while deleting the plant." });
    }
};
