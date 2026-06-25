import CityTable from "../components/CityTable";
import CategoryTable from "../components/CategoryTable";
import PartnerTable from "../components/PartnerTable";
import UserTable from "../components/UserTable";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Admin Dashboard
      </h1>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Cities */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <CityTable />
        </div>

        {/* Categories */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <CategoryTable />
        </div>

        {/* Partners */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <PartnerTable />
        </div>

        {/* Users */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <UserTable />
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;