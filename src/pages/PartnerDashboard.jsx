import PartnerTable from "../components/PartnerTable";

function PartnerDashboard() {

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                Partner Dashboard
            </h1>
            <div className="bg-white shadow-lg rounded-xl p-6">
                <PartnerTable />
            </div>
        </div >
    );
}

export default PartnerDashboard;