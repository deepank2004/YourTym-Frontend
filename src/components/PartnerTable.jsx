import { useEffect, useState } from "react";
import API from "../services/api";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { kml } from "@tmcw/togeojson";

function FitBounds({ geoJsonData }) {
  const map = useMap();

  useEffect(() => {
    if (!geoJsonData) return;

    const coordinates = [];

    geoJsonData.features.forEach((feature) => {
      const geometry = feature.geometry;

      if (!geometry) return;

      if (geometry.type === "Point") {
        coordinates.push([
          geometry.coordinates[1],
          geometry.coordinates[0],
        ]);
      }

      if (geometry.type === "LineString") {
        geometry.coordinates.forEach((coord) => {
          coordinates.push([coord[1], coord[0]]);
        });
      }

      if (geometry.type === "Polygon") {
        geometry.coordinates[0].forEach((coord) => {
          coordinates.push([coord[1], coord[0]]);
        });
      }

      if (geometry.type === "MultiLineString") {
        geometry.coordinates.forEach((line) => {
          line.forEach((coord) => {
            coordinates.push([coord[1], coord[0]]);
          });
        });
      }

      if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach((polygon) => {
          polygon[0].forEach((coord) => {
            coordinates.push([coord[1], coord[0]]);
          });
        });
      }
    });

    if (coordinates.length > 0) {
      map.fitBounds(coordinates, {
        padding: [30, 30],
      });
    }
  }, [geoJsonData, map]);

  return null;
}

function PartnerTable() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState("");

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

  const openMapModal = async (partner) => {
    try {
      if (!partner.kmlFile) {
        alert("No KML file found for this partner's hub");
        return;
      }

      setSelectedPartner(partner);
      setMapModalOpen(true);
      setMapLoading(true);
      setMapError("");
      setGeoJsonData(null);

      const response = await fetch(partner.kmlFile);

      if (!response.ok) {
        throw new Error("Unable to load KML file");
      }

      const kmlText = await response.text();

      const parser = new DOMParser();
      const kmlDocument = parser.parseFromString(
        kmlText,
        "text/xml"
      );

      const geoJson = kml(kmlDocument);

      if (!geoJson.features || geoJson.features.length === 0) {
        throw new Error("No map data found inside KML file");
      }

      setGeoJsonData(geoJson);
    } catch (error) {
      console.log("KML MAP ERROR:", error);
      setMapError(
        "Unable to display this KML file on map. Please check if the KML file URL is public and valid."
      );
    } finally {
      setMapLoading(false);
    }
  };

  const closeMapModal = () => {
    setMapModalOpen(false);
    setSelectedPartner(null);
    setGeoJsonData(null);
    setMapError("");
  };

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
                    {partner.hub &&
                    partner.hub !== "N/A" &&
                    partner.hub !== "No Hub Assigned" ? (
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
                      <button
                        onClick={() => openMapModal(partner)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        View Map
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No KML
                      </span>
                    )}
                  </td>

                  <td className="border p-3">
                    {partner.createdAt
                      ? new Date(
                          partner.createdAt
                        ).toLocaleDateString()
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

      {mapModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold">
                  Hub Map
                </h3>

                <p className="text-sm text-gray-600">
                  Partner: {selectedPartner?.name} | Hub:{" "}
                  {selectedPartner?.hub}
                </p>
              </div>

              <button
                onClick={closeMapModal}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Close
              </button>
            </div>

            {mapLoading && (
              <div className="h-[500px] flex items-center justify-center text-lg font-medium">
                Loading map...
              </div>
            )}

            {mapError && (
              <div className="h-[500px] flex flex-col items-center justify-center text-center">
                <p className="text-red-600 font-medium mb-3">
                  {mapError}
                </p>

                <a
                  href={selectedPartner?.kmlFile}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Open KML File
                </a>
              </div>
            )}

            {!mapLoading && !mapError && geoJsonData && (
              <div className="h-[500px] w-full">
                <MapContainer
                  center={[28.6139, 77.209]}
                  zoom={10}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <GeoJSON data={geoJsonData} />

                  <FitBounds geoJsonData={geoJsonData} />
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PartnerTable;