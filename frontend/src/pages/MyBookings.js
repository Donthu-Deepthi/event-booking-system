import { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt, FaBell } from "react-icons/fa";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem("token");

            const { data } = await axios.get("/bookings/mybookings", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setBookings(data);
        };

        fetchBookings();
    }, []);

    const styles = `
        .page-wrapper {
            min-height: 90vh;
            background: linear-gradient(135deg, #f8f9fa, #eef1f5);
            padding-top: 50px;
            padding-bottom: 50px;
        }

        .booking-card {
            border-radius: 20px;
            border: none;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0,0,0,0.06);
            transition: 0.3s ease;
        }

        .booking-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 55px rgba(0,0,0,0.1);
        }

        .event-image {
            height: 180px;
            background-size: cover;
            background-position: center;
        }

        .status-badge {
            padding: 6px 12px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 600;
        }

        .paid {
            background: #e6f4ea;
            color: #28a745;
        }

        .pending {
            background: #fff3cd;
            color: #856404;
        }

        .info-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 500;
        }

        .icon-black {
            color: #111;
            font-size: 15px;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }
    `;

    return (
        <>
            <style>{styles}</style>

            <div className="page-wrapper">

                <div className="container">

                    <div className="text-center mb-5">
                        <FaTicketAlt size={40} style={{ color: "#111" }} className="mb-3" />
                        <h2 className="fw-bold">My Bookings</h2>
                        <p className="text-muted">
                            View and manage your event reservations
                        </p>
                    </div>

                    {bookings.length === 0 ? (
                        <div className="empty-state">
                            <h5>No bookings yet</h5>
                            <p>Once you book an event, it will appear here.</p>
                        </div>
                    ) : (
                        <div className="row">

                            {bookings.map(b => (
                                <div key={b._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">

                                    <div className="card booking-card h-100">

                                        {b.event.image && (
                                            <div
                                                className="event-image"
                                                style={{ backgroundImage: `url(${b.event.image})` }}
                                            ></div>
                                        )}

                                        <div className="p-4">

                                            <h5 className="fw-bold mb-3">
                                                {b.event.title}
                                            </h5>

                                            <div className="info-row">
                                                <FaCalendarAlt className="icon-black" />
                                                {b.event.date}
                                            </div>

                                            <div className="info-row">
                                                <FaMapMarkerAlt className="icon-black" />
                                                {b.event.location}
                                            </div>

                                            <div className="info-row">
                                                <FaTicketAlt className="icon-black" />
                                                Seats: {b.seatsBooked}
                                            </div>

                                            <div className="info-row">
                                                <FaBell className="icon-black" />
                                                {b.reminder ? "Reminder Enabled" : "Reminder Disabled"}
                                            </div>

                                            <div className="mt-3">
                                                <span
                                                    className={`status-badge ${b.paymentStatus === "paid"
                                                            ? "paid"
                                                            : "pending"
                                                        }`}
                                                >
                                                    {b.paymentStatus.toUpperCase()}
                                                </span>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>
        </>
    );
}

export default MyBookings;