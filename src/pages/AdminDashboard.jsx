import CityTable from "../components/CityTable";
import CategoryTable from "../components/CategoryTable";
import KMLUpload from "../components/KMLUpload";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Admin Dashboard
      </h1>

      <div className="max-w-7xl mx-auto space-y-8">

        <div className="bg-white shadow-lg rounded-xl p-6">
          <CityTable />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <CategoryTable />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <KMLUpload />
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;