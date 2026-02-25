import Event from "../models/Event.js";
//import Notification from "../models/Notification.js";
import User from "../models/User.js";
import createNotification from "../utils/createNotification.js";

// CREATE EVENT (Admin)
export const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        const users = await User.find();

        for (const user of users) {
            await createNotification(
                user._id,
                `New Event Added: ${event.title}`
            );
        }
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL EVENTS
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE EVENT
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE EVENT (Admin)
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.time = req.body.time || event.time;
        event.location = req.body.location || event.location;
        event.price = req.body.price || event.price;
        event.availableSeats = req.body.availableSeats || event.availableSeats;
        event.image = req.body.image || event.image;

        const updatedEvent = await event.save();
        const users = await User.find();

        for (const user of users) {
            await createNotification(
                user._id,
                `Event Updated: ${event.title}`
            );
        }

        res.json(updatedEvent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE EVENT (Admin)
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await event.deleteOne();

        res.json({ message: "Event deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};