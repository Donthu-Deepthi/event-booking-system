import { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaBell, FaCheckCircle } from "react-icons/fa";
function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  const markRead = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `/notifications/${id}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchNotifications();
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div
      className="container py-5"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1">Notifications</h2>
          <p className="text-muted mb-0">
            Stay updated with your latest activity
          </p>
        </div>

        {unreadCount > 0 && (
          <div
            className="px-3 py-2 rounded-pill fw-semibold"
            style={{
              backgroundColor: "#111",
              color: "white",
              fontSize: "14px",
            }}
          >
            {unreadCount} Unread
          </div>
        )}
      </div>

      {/* ===== EMPTY STATE ===== */}
      {notifications.length === 0 && (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <FaBell size={45} className="text-dark mb-3" />
          <h5 className="fw-semibold">No Notifications Yet</h5>
          <p className="text-muted mb-0">
            We’ll notify you when something important happens.
          </p>
        </div>
      )}

      {/* ===== LIST ===== */}
      <div className="row g-4">
        {notifications.map((n) => (
          <div key={n._id} className="col-12">
            <div
              className="card border-0 rounded-4 shadow-sm p-4"
              style={{
                backgroundColor: n.isRead ? "#ffffff" : "#f1f3f5",
                transition: "all 0.25s ease",
                borderLeft: n.isRead
                  ? "4px solid transparent"
                  : "4px solid #111",
              }}
            >
              <div className="d-flex justify-content-between align-items-start">

                {/* LEFT SIDE */}
                <div className="d-flex gap-3">

                  {/* STATUS ICON */}
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "38px",
                      height: "38px",
                      backgroundColor: n.isRead ? "#e9ecef" : "#111",
                      color: n.isRead ? "#6c757d" : "#fff",
                      fontSize: "14px",
                    }}
                  >
                    {n.isRead ? <FaCheckCircle /> : <FaBell />}
                  </div>

                  <div>
                    <p className="mb-1 fw-semibold">
                      {n.message}
                    </p>

                    {!n.isRead && (
                      <small className="text-dark fw-semibold">
                        Unread
                      </small>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE BUTTON */}
                {!n.isRead && (
                  <button
                    className="btn btn-sm rounded-pill px-3 fw-semibold"
                    style={{
                      backgroundColor: "#111",
                      color: "white",
                    }}
                    onClick={() => markRead(n._id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;