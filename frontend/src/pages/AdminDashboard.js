import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
    FaEdit,
    FaTrash,
    FaCalendarAlt,
    FaUsers,
    FaMoneyBillWave,
} from "react-icons/fa";

function AdminDashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [events, setEvents] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        image: "",
        price: "",
        availableSeats: "",
    });

    useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);

    const fetchEvents = async () => {
        const { data } = await axios.get("/events");
        setEvents(data);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const createEvent = async () => {
        try {
            if (editingId) {
                await axios.put(`/events/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post("/events", form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            setEditingId(null);
            setForm({
                title: "",
                description: "",
                date: "",
                time: "",
                location: "",
                image: "",
                price: "",
                availableSeats: "",
            });

            fetchEvents();
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    const editHandler = (event) => {
        setEditingId(event._id);
        setForm(event);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteHandler = async (id) => {
        if (!window.confirm("Delete this event?")) return;

        await axios.delete(`/events/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        fetchEvents();
    };

    const totalSeats = events.reduce(
        (a, b) => a + Number(b.availableSeats || 0),
        0
    );

    const totalRevenue = events.reduce(
        (a, b) => a + Number(b.price || 0),
        0
    );

    return (
        <div
            className="container-fluid py-5 px-lg-5"
            style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
        >
            {/* ===== HEADER ===== */}
            <div className="mb-5">
                <h2 className="fw-bold mb-1">Admin Dashboard</h2>
                <p className="text-muted mb-0">
                    Manage events, monitor seats and track revenue
                </p>
            </div>

            {/* ===== STATS ===== */}
            <div className="row g-4 mb-5">
                <StatCard
                    icon={<FaCalendarAlt />}
                    title="Total Events"
                    value={events.length}
                />
                <StatCard
                    icon={<FaUsers />}
                    title="Total Seats"
                    value={totalSeats}
                />
                <StatCard
                    icon={<FaMoneyBillWave />}
                    title="Revenue Potential"
                    value={`₹${totalRevenue}`}
                />
            </div>

            <div className="row g-4">
                {/* ===== LEFT FORM ===== */}
                <div className="col-lg-4">
                    <div
                        className="card border-0 rounded-4 p-4 shadow"
                        style={{ backgroundColor: "white" }}
                    >
                        <h5 className="fw-bold mb-4">
                            {editingId ? "Edit Event" : "Create New Event"}
                        </h5>

                        <div className="d-flex flex-column gap-3">

                            <input
                                className="form-control rounded-3"
                                placeholder="Event Title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                            />

                            <textarea
                                className="form-control rounded-3"
                                rows="3"
                                placeholder="Event Description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                            />

                            <div className="row g-2">
                                <div className="col">
                                    <input
                                        type="date"
                                        className="form-control rounded-3"
                                        value={form.date}
                                        onChange={(e) =>
                                            setForm({ ...form, date: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="time"
                                        className="form-control rounded-3"
                                        value={form.time}
                                        onChange={(e) =>
                                            setForm({ ...form, time: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <input
                                className="form-control rounded-3"
                                placeholder="Location"
                                value={form.location}
                                onChange={(e) =>
                                    setForm({ ...form, location: e.target.value })
                                }
                            />

                            <input
                                className="form-control rounded-3"
                                placeholder="Image URL"
                                value={form.image}
                                onChange={(e) =>
                                    setForm({ ...form, image: e.target.value })
                                }
                            />

                            {form.image && (
                                <img
                                    src={form.image}
                                    alt="Preview"
                                    className="img-fluid rounded-3"
                                    style={{ height: "160px", objectFit: "cover" }}
                                />
                            )}

                            <div className="row g-2">
                                <div className="col">
                                    <input
                                        type="number"
                                        className="form-control rounded-3"
                                        placeholder="Price"
                                        value={form.price}
                                        onChange={(e) =>
                                            setForm({ ...form, price: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="number"
                                        className="form-control rounded-3"
                                        placeholder="Seats"
                                        value={form.availableSeats}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                availableSeats: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <button
                                className="btn btn-dark rounded-3 fw-semibold mt-2"
                                onClick={createEvent}
                            >
                                {editingId ? "Update Event" : "Create Event"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ===== RIGHT TABLE ===== */}
                <div className="col-lg-8">
                    <div className="card border-0 rounded-4 shadow p-4 bg-white">
                        <h5 className="fw-bold mb-4">Event Management</h5>

                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr className="text-muted">
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Price</th>
                                        <th>Seats</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((e) => (
                                        <tr key={e._id}>
                                            <td className="fw-semibold">{e.title}</td>
                                            <td>{e.date}</td>
                                            <td>₹{e.price}</td>
                                            <td>{e.availableSeats}</td>
                                            <td className="text-end">
                                                <button
                                                    className="btn btn-sm me-2 rounded-3"
                                                    style={{
                                                        backgroundColor: "#fff3cd",
                                                        border: "1px solid #ffe69c",
                                                    }}
                                                    onClick={() => editHandler(e)}
                                                >
                                                    <FaEdit style={{ color: "#d39e00" }} />
                                                </button>

                                                <button
                                                    className="btn btn-sm rounded-3"
                                                    style={{
                                                        backgroundColor: "#f8d7da",
                                                        border: "1px solid #f5c2c7",
                                                    }}
                                                    onClick={() => deleteHandler(e._id)}
                                                >
                                                    <FaTrash style={{ color: "#b02a37" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value }) {
    return (
        <div className="col-md-4">
            <div className="card border-0 shadow rounded-4 p-4 bg-white h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <small className="text-muted">{title}</small>
                        <h4 className="fw-bold mt-1 mb-0">{value}</h4>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                            width: "45px",
                            height: "45px",
                            backgroundColor: "#f1f3f5",
                            fontSize: "18px",
                            color: "#000",
                        }}
                    >
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;