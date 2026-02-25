import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import { FaLock, FaCreditCard } from "react-icons/fa";

function Payment() {

    const stripe = useStripe();
    const elements = useElements();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const payHandler = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const { data } = await axios.post(
                "/payments/create-payment-intent",
                { bookingId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const result = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                }
            );

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
            } else if (result.paymentIntent.status === "succeeded") {
                window.location.href = "/success";
            }

        } catch (err) {
            setError("Payment failed. Please try again.");
            setLoading(false);
        }
    };

    const styles = `
        .payment-wrapper {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .payment-card {
            border-radius: 20px;
            border: none;
            padding: 40px;
            box-shadow: 0 25px 60px rgba(0,0,0,0.08);
        }

        .card-box {
            padding: 15px;
            border-radius: 12px;
            border: 1px solid #ddd;
            background: #fafafa;
        }

        .pay-btn {
            border-radius: 50px;
            padding: 12px;
            font-weight: 600;
            transition: 0.3s ease;
        }

        .pay-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.15);
        }

        .secure-text {
            font-size: 14px;
            color: #666;
        }

        .error-text {
            font-size: 14px;
            color: red;
            margin-top: 10px;
        }
    `;

    return (
        <>
            <style>{styles}</style>

            <div className="container payment-wrapper">

                <div className="col-lg-5 col-md-7 col-sm-12">

                    <div className="card payment-card">

                        <div className="text-center mb-4">
                            <FaCreditCard size={40} className="mb-3 text-dark" />
                            <h3 className="fw-bold">Secure Payment</h3>
                            <p className="text-muted mb-0">
                                Complete your booking safely
                            </p>
                        </div>

                        <div className="card-box mb-3">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#333",
                                            "::placeholder": {
                                                color: "#888"
                                            }
                                        },
                                        invalid: {
                                            color: "#e5424d"
                                        }
                                    }
                                }}
                            />
                        </div>

                        {error && (
                            <div className="error-text text-center">
                                {error}
                            </div>
                        )}

                        <button
                            className="btn btn-dark w-100 pay-btn mt-3"
                            onClick={payHandler}
                            disabled={loading || !stripe}
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>

                        <div className="text-center mt-3 secure-text">
                            <FaLock className="me-1" />
                            Payments are securely processed by Stripe
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Payment;