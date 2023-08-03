import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Unidentified",
    },
    imageUrl: {
        type: String,
        required: true,
    },
    identificationStatus: {
        type: String,
        enum: ["Identified", "Unidentified"],
        default: "Unidentified",
    },
    careInstructions: {
        type: String,
        default: "Pending Identification",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
    identifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    identifiedAt: {
        type: Date,
    }
});

const Plant = mongoose.model("Plant", plantSchema);

export default Plant;
