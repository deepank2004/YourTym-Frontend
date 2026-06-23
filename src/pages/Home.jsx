import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex flex-col items-center justify-center">

            <h1 className="text-5xl font-bold text-white mb-10">
                Hub Management System
            </h1>

            <div className="flex gap-6">

                <button
                    onClick={() => navigate("/admin")}
                    className="bg-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition"
                >
                    Admin
                </button>

                <button
                    onClick={() => navigate("/partner")}
                    className="bg-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition"
                >
                    Partner
                </button>

                <button
                    onClick={() => navigate("/user")}
                    className="bg-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition"
                >
                    User
                </button>

            </div>

        </div>
    );
}

export default Home;