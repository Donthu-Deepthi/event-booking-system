import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUserShield, FaSignOutAlt, FaTicketAlt } from "react-icons/fa";
import { MdHome, MdNotifications } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { HiUserAdd } from "react-icons/hi";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">

                {/* Brand */}
                <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
                    <FaCalendarAlt />
                    Event Booking System
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-1" to="/">
                                <MdHome /> Home
                            </Link>
                        </li>

                        {token && role === "admin" && (
                            <li className="nav-item">
                                <Link className="nav-link text-warning d-flex align-items-center gap-1" to="/admin">
                                    <FaUserShield /> Admin
                                </Link>
                            </li>
                        )}

                        {token && (
                            <li className="nav-item">
                                <Link className="nav-link d-flex align-items-center gap-1" to="/mybookings">
                                    <FaTicketAlt /> My Bookings
                                </Link>
                            </li>
                        )}

                        {token && (
                            <li className="nav-item">
                                <Link className="nav-link d-flex align-items-center gap-1" to="/calendar">
                                    <FaTicketAlt /> Calendar
                                </Link>
                            </li>
                        )}

                        {token && (
                            <li className="nav-item">
                                <Link className="nav-link d-flex align-items-center gap-1" to="/notifications">
                                    <MdNotifications /> Notifications
                                </Link>
                            </li>
                        )}

                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-light me-2 d-flex align-items-center gap-1" to="/login">
                                        <FiLogIn /> Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary d-flex align-items-center gap-1" to="/register">
                                        <HiUserAdd /> Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-danger d-flex align-items-center gap-1" onClick={logout}>
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;