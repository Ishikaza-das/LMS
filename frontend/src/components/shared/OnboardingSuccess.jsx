import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OnboardingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-2xl font-bold text-green-500">Stripe Onboarding Successful!</h1>
      <p className="mt-2">Your instructor account is now connected with Stripe.</p>
      <Button className="mt-6 bg-blue-500" onClick={() => navigate("/admin/dashboard")}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default OnboardingSuccess;
