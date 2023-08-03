import mongoose from 'mongoose';

const IdentificationRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    plantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Plant'
    },
    status: {
        type: String,
        enum: ['unidentified', 'identified'],
        default: 'unidentified'
    },
    imageUrl: {
        type: String,
        required: true
    },
    identifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('IdentificationRequest', IdentificationRequestSchema);
