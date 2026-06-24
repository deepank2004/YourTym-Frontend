import React, { useState } from "react";
import AddHub from "./AddHub";
import GetHubs from "./GetHubs";

const HubManagement = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Hub Management
        </h1>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("add")}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              activeTab === "add"
                ? "bg-blue-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            Add Hub
          </button>

          <button
            onClick={() => setActiveTab("view")}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              activeTab === "view"
                ? "bg-green-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            Get Hubs
          </button>
        </div>

        {/* Content */}
        {activeTab === "add" ? <AddHub /> : <GetHubs />}
      </div>
    </div>
  );
};

export default HubManagement;