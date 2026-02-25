import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const { data } = await axios.post("/auth/login", {
            email,
            password
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        navigate("/");
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12">

                    <div className="card shadow p-4 border-0 rounded-4">

                        <h2 className="text-center mb-4 fw-bold">
                            Login
                        </h2>

                        <form onSubmit={submitHandler}>

                            {/* Email Field */}
                            <div className="input-group mb-3">
                                <span className="input-group-text bg-white border-end-0">
                                    <FaEnvelope className="text-dark" />
                                </span>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-control border-start-0"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="input-group mb-4">
                                <span className="input-group-text bg-white border-end-0">
                                    <FaLock className="text-dark" />
                                </span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-control border-start-0"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-dark w-100 rounded-pill"
                            >
                                Login
                            </button>

                        </form>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Login;