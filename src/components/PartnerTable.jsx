import { useEffect, useState } from "react";
import API from "../services/api";

function PartnerTable() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPartners = async () => {
    try {
      const response = await API.get("/partners");

      const partnerData =
        response.data?.data ||
        response.data?.partners ||
        response.data;

      setPartners(Array.isArray(partnerData) ? partnerData : []);
    } catch (error) {
      console.log("Error fetching partners:", error);
      alert("Failed to fetch partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-medium">
        Loading Partners...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Partners
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-3">Partner ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Image</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">City</th>
              <th className="border p-3">Hub</th>
              <th className="border p-3">KML Map</th>
              <th className="border p-3">Created At</th>
            </tr>
          </thead>

          <tbody>
            {partners.length > 0 ? (
              partners.map((partner) => (
                <tr key={partner._id} className="text-center">
                  <td className="border p-3">
                    {partner.partnerId || "N/A"}
                  </td>

                  <td className="border p-3">
                    {partner.name || "N/A"}
                  </td>

                  <td className="border p-3">
                    {partner.image ? (
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-16 h-16 rounded object-cover mx-auto"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="border p-3">
                    {partner.category || "N/A"}
                  </td>

                  <td className="border p-3">
                    {partner.city || "N/A"}
                  </td>

                  <td className="border p-3">
                    {partner.hub && partner.hub !== "N/A" ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                        {partner.hub}
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                        No Hub Assigned
                      </span>
                    )}
                  </td>

                  <td className="border p-3">
                    {partner.kmlFile ? (
                      <a
                        href={partner.kmlFile}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm inline-block"
                      >
                        View Map
                      </a>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No KML
                      </span>
                    )}
                  </td>

                  <td className="border p-3">
                    {partner.createdAt
                      ? new Date(partner.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border p-4 text-center"
                >
                  No Partners Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PartnerTable;