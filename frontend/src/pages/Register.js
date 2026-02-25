import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notificationPreference, setNotificationPreference] = useState(true);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        await axios.post("/auth/register", {
            name,
            email,
            password,
            notificationPreference
        });

        alert("Registration Successful");
        navigate("/login");
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">Register</h2>

                        <form onSubmit={submitHandler}>

                            <input
                                className="form-control mb-3"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {/* Notification Preference */}
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={notificationPreference}
                                    onChange={(e) => setNotificationPreference(e.target.checked)}
                                />
                                <label className="form-check-label">
                                    Enable Event Notifications
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Register
                            </button>

                        </form>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Register;