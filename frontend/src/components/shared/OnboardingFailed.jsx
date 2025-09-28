import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OnboardingFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-2xl font-bold text-red-500">Stripe Onboarding Failed!</h1>
      <p className="mt-2">Something went wrong. Please try again.</p>
      <Button className="mt-6 bg-blue-500" onClick={() => navigate("/admin/dashboard")}>
        Retry Onboarding
      </Button>
    </div>
  );
};

export default OnboardingFailed;
