import IdentificationRequest from "../models/IdentificationRequest.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const identifyPlant = async (req, res) => {
    const requestId = req.params.requestId;
    const { name, careInstructions } = req.body;

    try {
        const request = await IdentificationRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "No identification request found with this ID" });
        }

        request.name = name;
        request.careInstructions = careInstructions;
        request.status = 'Identified';

        await request.save();
        
        res.json(request);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { username, email } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "No user found with this ID" });
        }

        user.username = username;
        user.email = email;

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "No user found with this ID" });
        }

        await user.remove();

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}


export const getIdentificationRequests = async (req, res) => {
    try {
        const requests = await IdentificationRequest.find({ status: "Unidentified" });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const createUser = async (req, res) => {
    const { email, username, password, isAdmin, imageUrl } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            email,
            username,
            password: hashedPassword,
            isAdmin,
            imageUrl
        });

        await user.save();

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}
