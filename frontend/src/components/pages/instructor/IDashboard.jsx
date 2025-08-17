import Navbar from "@/components/shared/Navbar";
import React from "react";

const IDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-4">
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