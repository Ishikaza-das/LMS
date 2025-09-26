import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PaymentSuccess = () => {
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get("session_id");
    const [status, setStatus] = useState("Verifying payment...");

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_PAYMENT_API}/verify-payment`,{ sessionId },{withCredentials:true})
                if(response.data.success){
                    setStatus("Payment Successful! You are now enrolled in this course.")
                }else{
                    setStatus("Payment could not be verified.");
                }
            } catch (error) {
                console.error(error);
                setStatus("Error verifying payment.");
            }
        }
        if(sessionId) verify();
    },[sessionId]);

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold'>{status}</h1>
    </div>
  )
}

export default PaymentSuccess 
