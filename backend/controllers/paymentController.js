import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import Booking from "../models/Booking.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: booking.totalPrice * 100,
            currency: "inr",
            payment_method_types: ["card"]
        });

        // Mark as paid
        booking.paymentStatus = "paid";
        await booking.save();

        res.json({
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};