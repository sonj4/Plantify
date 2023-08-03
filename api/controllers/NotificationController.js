import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const createNotification = async (req, res) => {
    try {
        const newNotification = new Notification({
            ...req.body,
            user: req.user.id
        });

        const savedNotification = await newNotification.save();
        res.json(savedNotification);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.notificationId);

        if (!notification) {
            return res.status(404).json({ message: "No notification found with this ID" });
        }

        if (String(notification.user) !== String(req.user.id)) {
            return res.status(401).json({ message: "You are not authorized to update this notification" });
        }

        Object.assign(notification, req.body);
        const updatedNotification = await notification.save();
        res.json(updatedNotification);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.notificationId);

        if (!notification) {
            return res.status(404).json({ message: "No notification found with this ID" });
        }

        if (String(notification.user) !== String(req.user.id)) {
            return res.status(401).json({ message: "You are not authorized to delete this notification" });
        }

        await notification.remove();
        res.json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}
