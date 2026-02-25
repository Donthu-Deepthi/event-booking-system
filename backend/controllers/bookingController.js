import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import createNotification from "../utils/createNotification.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
    try {
        const { eventId, seatsBooked, reminder } = req.body;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.availableSeats < seatsBooked) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        const totalPrice = event.price * seatsBooked;

        const booking = await Booking.create({
            user: req.user.id,
            event: eventId,
            seatsBooked,
            totalPrice,
            reminder
        });

        event.availableSeats -= seatsBooked;
        await event.save();
        await createNotification(
            process.env.ADMIN_ID,
            `New booking created for event`
        );

        res.status(201).json(booking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET MY BOOKINGS
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate("event");

        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};