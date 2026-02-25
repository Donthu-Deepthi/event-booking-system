import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data } = await axios.get("/events");
            setEvents(data);
        };
        fetchEvents();
    }, []);

    const styles = `
        .event-card {
            transition: all 0.35s ease;
            box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }

        .event-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
        }

        .event-card img {
            transition: transform 0.4s ease;
        }

        .event-card:hover img {
            transform: scale(1.05);
        }

        /* ===== HERO BUTTON HOVER ===== */
        .btn-outline-light-custom {
            border: 1px solid #555;
            color: white;
            background: transparent;
            transition: all 0.3s ease;
        }

        .btn-outline-light-custom:hover {
            background: white;
            color: black;
            border-color: white;
        }
    `;

    return (
        <>
            <style>{styles}</style>
            {/* ================= HERO SECTION ================= */}
            {/* ================= PREMIUM BLACK & WHITE HERO ================= */}
            <section
                className="mb-5"
                style={{
                    backgroundColor: "#111",
                    color: "white",
                    borderRadius: "20px",
                }}
            >
                <div className="container py-5">

                    <div className="row align-items-center">

                        {/* LEFT SIDE */}
                        <div className="col-lg-12">

                            <p
                                className="text-uppercase mb-3 ms-4"
                                style={{
                                    letterSpacing: "2px",
                                    fontSize: "13px",
                                    color: "#bbb"
                                }}
                            >
                                Exclusive Event Platform
                            </p>

                            <h1
                                className="fw-bold mb-2 ms-4"
                                style={{
                                    fontSize: "2.8rem",
                                    lineHeight: "1.2"
                                }}
                            >
                                Discover Events That
                                Define Experiences
                            </h1>

                            <p
                                className="mb-3 ms-4"
                                style={{
                                    color: "#ccc",
                                    maxWidth: "700px"
                                }}
                            >
                                From curated workshops to large-scale conferences, find experiences that inspire and connect you.
                            </p>

                            <div className="d-flex gap-3 ms-3">
                                <Link
                                    to="/"
                                    className="btn rounded-pill px-4 py-2 fw-semibold"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                >
                                    Browse Events
                                </Link>

                                <Link
                                    to="/calendar"
                                    className="btn btn-outline-light-custom rounded-pill px-4 py-2 fw-semibold"
                                >
                                    View Calendar
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ================= SECTION HEADER ================= */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Upcoming Events</h2>
                    <p className="text-muted mb-0">
                        Carefully curated experiences for you
                    </p>
                </div>
            </div>

            {/* ================= EMPTY STATE ================= */}
            {events.length === 0 && (
                <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
                    <h5 className="fw-semibold">No Events Available</h5>
                    <p className="text-muted mb-0">
                        Please check back later for new updates.
                    </p>
                </div>
            )}

            {/* ================= EVENT CARDS ================= */}
            <div className="row g-4">
                {events.map((event) => (
                    <div key={event._id} className="col-lg-4 col-md-6 col-12">

                        <div
                            className="card border-0 h-100 rounded-4 overflow-hidden event-card"
                            style={{
                                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                                transition: "all 0.35s ease"
                            }}
                        >
                            {event.image && (
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="card-img-top"
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                />
                            )}

                            <div className="card-body d-flex flex-column p-4">

                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="fw-bold mb-0">
                                        {event.title}
                                    </h5>

                                    <span className="badge bg-light text-dark border">
                                        {event.availableSeats} Seats
                                    </span>
                                </div>

                                <p className="text-muted d-flex align-items-center gap-2 mb-2">
                                    <FaMapMarkerAlt className="text-dark" />
                                    {event.location}
                                </p>

                                <p className="text-muted d-flex align-items-center gap-2 mb-3">
                                    <FaCalendarAlt className="text-dark" />
                                    {event.date}
                                </p>

                                <div className="mt-auto d-flex justify-content-between align-items-center">

                                    <span className="fs-5 fw-bold text-dark">
                                        ₹{event.price}
                                    </span>

                                    <Link
                                        to={`/event/${event._id}`}
                                        className="btn btn-sm btn-dark rounded-pill px-3"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;