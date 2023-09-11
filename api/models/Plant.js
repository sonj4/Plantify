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
    }, 
    locations: {
        type: [{
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true
            }
        }],
        index: '2dsphere' // Create a geospatial index on the 'locations' field
    }
});

const Plant = mongoose.model("Plant", plantSchema);

export default Plant;
