import { Link } from "react-router-dom";
import { FaCheckCircle, FaHome, FaTicketAlt } from "react-icons/fa";

function Success() {

    const styles = `
        .success-wrapper {
            min-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f8f9fa, #eef1f5);
        }

        .success-card {
            border-radius: 25px;
            border: none;
            padding: 50px 40px;
            box-shadow: 0 25px 60px rgba(0,0,0,0.08);
            animation: fadeIn 0.6s ease-in-out;
        }

        .success-icon {
            font-size: 70px;
            color: #28a745;
            margin-bottom: 20px;
        }

        .info-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            margin-top: 25px;
        }

        .home-btn {
            border-radius: 50px;
            padding: 12px;
            font-weight: 600;
            transition: 0.3s ease;
        }

        .home-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    return (
        <>
            <style>{styles}</style>

            <div className="success-wrapper">

                <div className="col-lg-5 col-md-7 col-sm-12">

                    <div className="card success-card text-center">

                        <div style={{ textAlign: "center" }}>
                            <FaCheckCircle className="success-icon" />
                        </div>

                        <h2 className="fw-bold mb-3">
                            Payment Successful
                        </h2>

                        <p className="text-muted mb-1">
                            Your ticket has been successfully booked.
                        </p>

                        <p className="text-muted">
                            A reminder notification will be sent before your event.
                        </p>

                        <div className="info-box">
                            <FaTicketAlt className="mb-2 text-dark" size={22} />
                            <p className="mb-0 fw-semibold">
                                Booking Confirmed
                            </p>
                            <small className="text-muted">
                                Your seat is now reserved.
                            </small>
                        </div>

                        <Link
                            to="/"
                            className="btn btn-dark w-100 mt-4 home-btn"
                        >
                            <FaHome className="me-2" />
                            Back to Home
                        </Link>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Success;