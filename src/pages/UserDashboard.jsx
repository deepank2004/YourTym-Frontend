import UserTable from "../components/UserTable";

function UserDashboard() {

    return (
        <div>
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                User Dashboard
            </h1>
            <div className="bg-white shadow-lg rounded-xl p-6">
                <UserTable />
            </div>
        </div>
    );
}

export default UserDashboard;