import cron from "node-cron";
import Booking from "../models/Booking.js";
import Notification from "../models/Notification.js";
import Event from "../models/Event.js";

cron.schedule("* * * * *", async () => {

    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const bookings = await Booking.find({ reminder: true })
        .populate("event user");

    for (let booking of bookings) {

        const eventTime = new Date(
            `${booking.event.date}T${booking.event.time}`
        );

        if (
            eventTime > now &&
            eventTime <= oneHourLater
        ) {
            await Notification.create({
                user: booking.user._id,
                message: `Reminder: ${booking.event.title} starts in 1 hour`
            });
        }
    }
});