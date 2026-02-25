import Notification from "../models/Notification.js";

// GET USER NOTIFICATIONS
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// MARK AS READ
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        // ensure only owner updates
        if (notification.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        notification.isRead = true;
        await notification.save();

        res.json({ message: "Marked as read" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};