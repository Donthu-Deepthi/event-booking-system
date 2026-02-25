import { useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaTicketAlt, FaBell } from "react-icons/fa";

function Booking() {

    const { id } = useParams();

    const [seats, setSeats] = useState(1);
    const [reminder, setReminder] = useState(true);

    const navigate = useNavigate();

    const bookHandler = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const { data } = await axios.post(
            "/bookings",
            {
                eventId: id,
                seatsBooked: seats,
                reminder: reminder
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        navigate(`/payment/${data._id}`);
    };

    const styles = `
        .booking-card {
            border-radius: 20px;
            border: none;
            box-shadow: 0 20px 45px rgba(0,0,0,0.08);
        }

        .seat-control {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }

        .seat-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: #111;
            color: white;
            font-size: 18px;
            transition: 0.3s ease;
        }

        .seat-btn:hover {
            background: #333;
        }

        .seat-count {
            font-size: 22px;
            font-weight: 600;
            min-width: 40px;
            text-align: center;
        }

        .reminder-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .pay-btn {
            border-radius: 50px;
            padding: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .pay-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
    `;

    return (
        <>
            <style>{styles}</style>

            <div className="container mt-5 mb-5">

                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-12">

                        <div className="card booking-card p-5">

                            <div className="text-center mb-4">
                                <FaTicketAlt size={40} className="mb-3 text-dark" />
                                <h3 className="fw-bold">Book Your Seats</h3>
                                <p className="text-muted mb-0">
                                    Select number of seats and confirm your booking.
                                </p>
                            </div>

                            {/* Seat Selector */}
                            <div className="mb-4 text-center">
                                <label className="fw-semibold mb-3 d-block">
                                    Number of Seats
                                </label>

                                <div className="seat-control">
                                    <button
                                        className="seat-btn"
                                        onClick={() => seats > 1 && setSeats(seats - 1)}
                                    >
                                        −
                                    </button>

                                    <div className="seat-count">
                                        {seats}
                                    </div>

                                    <button
                                        className="seat-btn"
                                        onClick={() => setSeats(seats + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Reminder Option */}
                            <div className="reminder-box mb-4">
                                <FaBell />
                                <div className="flex-grow-1">
                                    <div className="fw-semibold">
                                        Event Reminder
                                    </div>
                                    <small className="text-muted">
                                        Get notified before the event starts
                                    </small>
                                </div>

                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={reminder}
                                    onChange={(e) => setReminder(e.target.checked)}
                                />
                            </div>

                            {/* Proceed Button */}
                            <button
                                className="btn btn-dark w-100 pay-btn"
                                onClick={bookHandler}
                            >
                                Proceed to Payment
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}

export default Booking;