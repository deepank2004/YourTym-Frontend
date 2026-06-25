import React, { useEffect, useState } from "react";
import API from "../services/api";

const GetHubs = () => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [selectedHub, setSelectedHub] = useState(null);
  const [partners, setPartners] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // fetch all partners
  const fetchPartners = async () => {
    try {
      const res = await API.get("/partners");
      const data = res.data?.data || res.data || [];
      setPartners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHubs();
    fetchPartners();
  }, []);

  // open modal
  const handleEditHub = (hub) => {
    setSelectedHub(hub);

    setSelectedPartners(
      hub.partners?.map((p) => p._id) || []
    );

    setIsModalOpen(true);
  };

  // toggle partners
  const togglePartner = (id) => {
    setSelectedPartners((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  // save API
  const handleSave = async () => {
    try {
      await API.put(
        `/hubs/${selectedHub.hubId}/partners`,
        {
          partnerIds: selectedPartners
        }
      );

      alert("Hub updated successfully");

      setIsModalOpen(false);
      setSelectedHub(null);

      fetchHubs();

    } catch (err) {
      console.log(err);
      alert("Error updating hub");
    }
  };

  // 👥 helper for partner names
  const getPartnerNames = (hub) => {
    if (!hub.partners || hub.partners.length === 0) {
      return "No partners";
    }

    return hub.partners.map((p) => p.name).join(", ");
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-medium">
        Loading hubs...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">

      {/* TABLE */}
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

            {/* NEW COLUMN */}
            <th className="border p-3">Partners</th>

            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {hubs.length > 0 ? (
            hubs.map((hub) => (
              <tr key={hub._id} className="text-center">

                <td className="border p-3">{hub.hubId}</td>

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

                {/* 👥 PARTNERS COLUMN */}
                <td className="border p-3 text-left">
                  <div>
                    <div className="font-semibold text-sm">
                      {hub.partners?.length || 0} partners
                    </div>

                    <div className="text-gray-600 text-xs truncate max-w-[220px]">
                      {getPartnerNames(hub)}
                    </div>
                  </div>
                </td>

                {/* ACTION */}
                <td className="border p-3">
                  <button
                    onClick={() => handleEditHub(hub)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Update Hub
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="border p-4 text-center">
                No hubs found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Update Hub Partners
            </h2>

            <div className="max-h-60 overflow-y-auto">
              {partners.map((p) => (
                <label
                  key={p._id}
                  className="block mb-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedPartners.includes(p._id)}
                    onChange={() => togglePartner(p._id)}
                    className="mr-2"
                  />
                  {p.name}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default GetHubs;