import React, { useEffect, useState } from "react";
import API from "../services/api";

const GetHubs = () => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedHub, setSelectedHub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [partnerIdsInput, setPartnerIdsInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchHubs = async () => {
    try {
      setLoading(true);

      const response = await API.get("/hubs");

      const hubData =
        response.data?.data ||
        response.data?.hubs ||
        response.data;

      setHubs(Array.isArray(hubData) ? hubData : []);
    } catch (error) {
      console.log("Error fetching hubs:", error);
      alert("Failed to fetch hubs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHubs();
  }, []);

  const handleEditHub = (hub) => {
    setSelectedHub(hub);

    const existingPartnerIds = (hub.partners || [])
      .map((partner) => {
        if (typeof partner === "string") {
          return partner;
        }

        return partner._id || "";
      })
      .filter(Boolean)
      .join("\n");

    setPartnerIdsInput(existingPartnerIds);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!selectedHub) {
        alert("No hub selected");
        return;
      }

      if (!selectedHub.hubId) {
        alert("Hub ID is missing");
        return;
      }

      const partnerIds = partnerIdsInput
        .split(/[\n,\s]+/)
        .map((id) => id.trim())
        .filter(Boolean);

      const uniquePartnerIds = [...new Set(partnerIds)];

      if (uniquePartnerIds.length === 0) {
        alert("Please enter at least one MongoDB Partner _id");
        return;
      }

      setSaving(true);

      await API.put(`/hubs/${selectedHub.hubId}/partners`, {
        partnerIds: uniquePartnerIds,
      });

      alert("Hub partners updated successfully");

      setIsModalOpen(false);
      setSelectedHub(null);
      setPartnerIdsInput("");

      fetchHubs();
    } catch (err) {
      console.log("UPDATE HUB ERROR:", err);

      const message =
        err?.response?.data?.message || "Error updating hub partners";

      const invalidIds =
        err?.response?.data?.invalidIds ||
        err?.response?.data?.notFoundIds;

      if (invalidIds?.length > 0) {
        alert(`${message}: ${invalidIds.join(", ")}`);
      } else {
        alert(message);
      }
    } finally {
      setSaving(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHub(null);
    setPartnerIdsInput("");
  };

  const getPartnerNames = (hub) => {
    if (!hub.partners || hub.partners.length === 0) {
      return "No partners";
    }

    return hub.partners
      .map((partner) => {
        if (typeof partner === "string") {
          return partner;
        }

        return partner.name || partner.partnerId || partner._id || "Unknown Partner";
      })
      .join(", ");
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
            <th className="border p-3">Partners</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {hubs.length > 0 ? (
            hubs.map((hub) => (
              <tr key={hub._id || hub.hubId} className="text-center">
                <td className="border p-3">{hub.hubId || "N/A"}</td>

                <td className="border p-3">
                  {hub.city?.cityName || hub.city?.name || "N/A"}
                </td>

                <td className="border p-3">
                  {hub.category?.name || "N/A"}
                </td>

                <td className="border p-3">
                  {hub.serviceDistanceKm ?? "N/A"}
                </td>

                <td className="border p-3">
                  {hub.kmlFile ? (
                    <a
                      href={hub.kmlFile}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View KML
                    </a>
                  ) : (
                    "N/A"
                  )}
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
                  {hub.createdAt
                    ? new Date(hub.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="border p-3 text-left">
                  <div className="font-semibold text-sm">
                    {hub.partners?.length || 0} partners
                  </div>

                  <div className="text-gray-600 text-xs truncate max-w-[220px]">
                    {getPartnerNames(hub)}
                  </div>
                </td>

                <td className="border p-3">
                  <button
                    onClick={() => handleEditHub(hub)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
            <h2 className="text-xl font-bold mb-2">
              Update Hub Partners
            </h2>

            <p className="text-sm text-gray-600 mb-3">
              Hub ID:{" "}
              <span className="font-semibold">
                {selectedHub?.hubId}
              </span>
            </p>

            <label className="block text-sm font-medium mb-2">
              Paste Partner MongoDB Object IDs
            </label>

            <textarea
              value={partnerIdsInput}
              onChange={(e) => setPartnerIdsInput(e.target.value)}
              maxLength={10000}
              rows={12}
              placeholder={`Paste Partner MongoDB _id here:

65f1a2b3c4d5e6f789123456
65f1a2b3c4d5e6f789123457`}
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="text-xs text-gray-500 mt-1">
              You can separate IDs using new lines, commas, or spaces.
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Characters: {partnerIdsInput.length}/10000
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={closeModal}
                disabled={saving}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetHubs;