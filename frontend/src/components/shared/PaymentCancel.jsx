import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="mb-6">Your payment was not completed. You can try again anytime.</p>
      <Button className="mt-6 bg-blue-500" onClick={() => navigate("/course")}>
        Go to Course
      </Button>
    </div>
  );
};

export default PaymentCancel;
