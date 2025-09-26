// import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="mb-6">Your payment was not completed. You can try again anytime.</p>

      {/* <Link
        to="/"
        className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
      >
        Back to Home
      </Link> */}
    </div>
  );
};

export default PaymentCancel;
