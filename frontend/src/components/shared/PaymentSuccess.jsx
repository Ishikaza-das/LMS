import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_PAYMENT_API}/verify-payment`,
          { sessionId }, 
          { withCredentials: true }
        );
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error("Payment verification failed");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error verifying payment.");
      }
    };

    if (sessionId) {
      verify();
    }
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful </h1>
    </div>
  );
};

export default PaymentSuccess;
