import { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

function CalendarView() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data } = await axios.get("/events");
            setEvents(data);
        };
        fetchEvents();
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        return {
            day: d.getDate(),
            month: d.toLocaleString("default", { month: "short" }),
            year: d.getFullYear(),
        };
    };

    return (
        <div className="container py-5">

            {/* ===== HEADER ===== */}
            <div className="mb-5 text-center">
                <h2 className="fw-bold display-6" style={{ color: "#000" }}>Event Schedule</h2>
                <p className="text-muted">
                    Plan your upcoming experiences efficiently
                </p>
            </div>

            {/* ===== EMPTY STATE ===== */}
            {events.length === 0 && (
                <div className="text-center py-5 rounded-4 border border-dark" style={{ background: "#f0f0f0", borderStyle: "dashed" }}>
                    <h5 className="fw-semibold mb-2" style={{ color: "#333" }}>No Upcoming Events</h5>
                    <p className="text-muted mb-0">Scheduled events will appear here.</p>
                </div>
            )}

            {/* ===== EVENTS LIST ===== */}
            <div className="position-relative">

                {events.map((event) => {
                    const dateObj = formatDate(event.date);

                    return (
                        <div
                            key={event._id}
                            className="d-flex align-items-start gap-4 mb-4 p-4 rounded-4 shadow-sm"
                            style={{
                                background: "#fff",
                                border: "1px solid #ccc",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.border = "1px solid #000";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.border = "1px solid #ccc";
                            }}
                        >

                            {/* DATE BADGE */}
                            <div
                                className="text-center rounded-4 d-flex flex-column justify-content-center align-items-center"
                                style={{
                                    minWidth: "80px",
                                    minHeight: "80px",
                                    background: "#000",
                                    color: "#fff",
                                    fontWeight: "600",
                                    borderRadius: "12px",
                                    padding: "12px 8px",
                                }}
                            >
                                <div style={{ fontSize: "24px", fontWeight: "700" }}>{dateObj.day}</div>
                                <div style={{ fontSize: "12px", opacity: 0.9 }}>{dateObj.month}</div>
                                <div style={{ fontSize: "12px", opacity: 0.9 }}>{dateObj.year}</div>
                            </div>

                            {/* EVENT DETAILS */}
                            {/* EVENT DETAILS */}
                            <div className="flex-grow-1">

                                <h5 className="fw-bold mb-2" style={{ color: "#000" }}>{event.title}</h5>

                                <div className="d-flex flex-column gap-2" style={{ color: "#555", fontSize: "0.85rem" }}>
                                    {/* Time */}
                                    <div className="d-flex align-items-center gap-2">
                                        <FaClock style={{ color: "#333" }} />
                                        <span>{event.time}</span>
                                    </div>

                                    {/* Location */}
                                    {event.location && (
                                        <div className="d-flex align-items-center gap-2">
                                            <FaMapMarkerAlt style={{ color: "#333" }} />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default CalendarView;