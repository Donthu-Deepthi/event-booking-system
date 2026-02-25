import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";

function EventDetails() {

    const { id } = useParams();
    const [event, setEvent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            const { data } = await axios.get(`/events/${id}`);
            setEvent(data);
        };
        fetchEvent();
    }, [id]);

    const styles = `
        .event-hero {
            height: 420px;
            background-size: cover;
            background-position: center;
            position: relative;
            border-radius: 25px;
            overflow: hidden;
        }

        .event-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2));
        }

        .event-hero-content {
            position: absolute;
            bottom: 40px;
            left: 40px;
            color: white;
        }

        .glass-card {
            background: rgba(255,255,255,0.7);
            backdrop-filter: blur(15px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .info-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            font-weight: 500;
        }

        .booking-card {
            background: #111;
            color: white;
            border-radius: 20px;
            padding: 30px;
            position: sticky;
            top: 100px;
            box-shadow: 0 20px 45px rgba(0,0,0,0.25);
        }

        .book-btn {
            border-radius: 50px;
            padding: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .book-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
    `;

    return (
        <>
            <style>{styles}</style>

            <div className="container mt-5 mb-5">

                {/* HERO IMAGE */}
                {event.image && (
                    <div
                        className="event-hero mb-5"
                        style={{ backgroundImage: `url(${event.image})` }}
                    >
                        <div className="event-overlay"></div>

                        <div className="event-hero-content">
                            <h1 className="fw-bold">{event.title}</h1>
                            <p className="mb-0">{event.date} • {event.location}</p>
                        </div>
                    </div>
                )}

                <div className="row">

                    {/* LEFT CONTENT */}
                    <div className="col-lg-8 mb-4">
                        <div className="glass-card">

                            <h4 className="fw-bold mb-3">About This Event</h4>

                            <p className="text-dark">
                                {event.description}
                            </p>

                            <hr />

                            <div className="mt-4">
                                <div className="info-item">
                                    <FaMapMarkerAlt />
                                    {event.location}
                                </div>

                                <div className="info-item">
                                    <FaCalendarAlt />
                                    {event.date}
                                </div>

                                <div className="info-item">
                                    <FaClock />
                                    {event.time}
                                </div>

                                <div className="info-item">
                                    <FaUsers />
                                    {event.availableSeats} Seats Available
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT BOOKING SIDEBAR */}
                    <div className="col-lg-4">
                        <div className="booking-card">

                            <h3 className="fw-bold mb-3">
                                ₹{event.price}
                            </h3>

                            <p className="text-light mb-4">
                                Secure your seat now before it's sold out.
                            </p>

                            {event.availableSeats > 0 ? (
                                <button
                                    className="btn btn-light w-100 book-btn"
                                    onClick={() => navigate(`/booking/${id}`)}
                                >
                                    Book Now
                                </button>
                            ) : (
                                <button
                                    className="btn btn-secondary w-100 book-btn"
                                    disabled
                                >
                                    Sold Out
                                </button>
                            )}

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default EventDetails;