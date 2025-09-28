import Navbar from "@/components/shared/Navbar";
import { AlertCircle } from "lucide-react";
import React from "react";

const stripId = "asadaw3412441adsd";

const IDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-4">
        {
          stripId ? (
            <div className="mb-2">
              <h1 className="font-medium text-lg">StripId: {stripId}</h1>
            </div>
          ) : (
            <div className="bg-red-500/20 border gap-2 border-red-400 h-20 mb-2 flex items-center p-4 rounded-md">
        <AlertCircle/>
          <h1 className="font-medium">
            Please create a Stripe account for payments in profile
          </h1>
        </div>
          )
        }
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-blue-500 h-40">
          </div>

          <div className="bg-amber-500 h-40">
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDashboard;