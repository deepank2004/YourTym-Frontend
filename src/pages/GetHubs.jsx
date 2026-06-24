import React, { useEffect, useState } from "react";
import API from "../services/api";

const GetHubs = () => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHubs = async () => {
    try {
      const response = await API.get("/hubs");

      const hubData =
        response.data?.data ||
        response.data?.hubs ||
        response.data;

      setHubs(Array.isArray(hubData) ? hubData : []);
    } catch (error) {
      console.log("Error fetching hubs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHubs();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-medium">
        Loading hubs...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">Hub ID</th>
            <th className="border p-3">City</th>
            <th className="border p-3">Category</th>
            <th className="border p-3">Distance (KM)</th>
            <th className="border p-3">KML File</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Created At</th>
          </tr>
        </thead>

        <tbody>
          {hubs.length > 0 ? (
            hubs.map((hub) => (
              <tr key={hub._id} className="text-center">

                <td className="border p-3">
                  {hub.hubId}
                </td>

                <td className="border p-3">
                  {hub.city?.name || hub.city?.cityName || "N/A"}
                </td>

                <td className="border p-3">
                  {hub.category?.name || "N/A"}
                </td>

                <td className="border p-3">
                  {hub.serviceDistanceKm}
                </td>

                <td className="border p-3">
                  <a
                    href={hub.kmlFile}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View KML
                  </a>
                </td>

                <td className="border p-3">
                  {hub.status ? (
                    <span className="text-green-600 font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="border p-3">
                  {new Date(hub.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="border p-4 text-center"
              >
                No hubs found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default GetHubs;