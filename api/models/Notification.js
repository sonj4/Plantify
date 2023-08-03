import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Notification', NotificationSchema);
