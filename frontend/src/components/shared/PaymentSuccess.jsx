import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_STRIPE_WEBHOOK_API}/payment-status/${sessionId}`,
          { withCredentials: true }
        );

        setStatus(res.data.success);

        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error("Payment not completed yet.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error checking payment status.");
      }
    };

    if (sessionId) {
      checkPaymentStatus();
    }
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center h-screen">
      {status === true && (
        <h1 className="text-2xl font-bold text-green-600">Payment Successful </h1>
      )}
      {status === false && (
        <h1 className="text-2xl font-bold text-red-600">Payment Failed </h1>
      )}
      {status === null && (
        <h1 className="text-2xl font-bold text-gray-600">Checking payment status...</h1>
      )}

      <Button className="mt-6 bg-blue-500" onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default PaymentSuccess;
