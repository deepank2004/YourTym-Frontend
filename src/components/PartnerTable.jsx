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
              <th className="border p-3">Created At</th>
            </tr>
          </thead>

          <tbody>
            {partners.length > 0 ? (
              partners.map((partner) => (
                <tr key={partner._id} className="text-center">

                  <td className="border p-3">
                    {partner.partnerId}
                  </td>

                  <td className="border p-3">
                    {partner.name}
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
                    {partner.category}
                  </td>

                  <td className="border p-3">
                    {partner.city}
                  </td>

                  <td className="border p-3">
                    {partner.hub}
                  </td>

                  <td className="border p-3">
                    {new Date(
                      partner.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
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