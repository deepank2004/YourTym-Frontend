import { useState } from "react";

import CityForm from "../components/CityForm";
import CategoryForm from "../components/CategoryForm";
import PartnerForm from "../components/PartnerForm";

function AdminDashboard() {

    const [activeTab, setActiveTab] =
        useState("city");

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="bg-blue-600 text-white p-5 shadow-md">

                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

            </div>

            <div className="flex">

                <div className="w-64 bg-white h-screen shadow-md">

                    <button
                        className="block w-full p-4 hover:bg-gray-200"
                        onClick={() => setActiveTab("city")}
                    >
                        City
                    </button>

                    <button
                        className="block w-full p-4 hover:bg-gray-200"
                        onClick={() => setActiveTab("category")}
                    >
                        Category
                    </button>

                    <button
                        className="block w-full p-4 hover:bg-gray-200"
                        onClick={() => setActiveTab("partner")}
                    >
                        Partner
                    </button>

                </div>

                <div className="flex-1 p-8">

                    {activeTab === "city" && <CityForm />}

                    {activeTab === "category" && <CategoryForm />}

                    {activeTab === "partner" && <PartnerForm />}

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;