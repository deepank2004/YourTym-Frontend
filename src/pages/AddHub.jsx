import React, { useEffect, useState } from "react";
import API from "../services/api";

const HubManagement = () => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [serviceDistanceKm, setServiceDistanceKm] = useState("");
  const [kmlFile, setKmlFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch cities & categories safely
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityRes = await API.get("/cities");
        const categoryRes = await API.get("/categories");

        console.log("CITY API:", cityRes.data);
        console.log("CATEGORY API:", categoryRes.data);

        const citiesData =
          cityRes.data?.data ||
          cityRes.data?.cities ||
          cityRes.data ||
          [];

        const categoriesData =
          categoryRes.data?.data ||
          categoryRes.data?.categories ||
          categoryRes.data ||
          [];

        setCities(Array.isArray(citiesData) ? citiesData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (err) {
        console.log("Fetch error:", err);
        setCities([]);
        setCategories([]);
      }
    };

    fetchData();
  }, []);

  // 📁 KML validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".kml")) {
      alert("Only .kml files are allowed!");
      e.target.value = "";
      return;
    }

    setKmlFile(file);
  };

  // 🚀 Submit Hub
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city || !category || !serviceDistanceKm || !kmlFile) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // ❌ hubId removed (backend should generate it)
      formData.append("city", city);
      formData.append("category", category);
      formData.append("serviceDistanceKm", serviceDistanceKm);
      formData.append("kmlFile", kmlFile);

      await API.post("/hubs", formData);

      alert("Hub created successfully!");

      // reset
      setCity("");
      setCategory("");
      setServiceDistanceKm("");
      setKmlFile(null);
      e.target.reset();
    } catch (err) {
      console.log("ERROR:", err);
      alert(err?.response?.data?.error || "Error creating hub");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Hub Management
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* CITY DROPDOWN */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name || c.cityName}
              </option>
            ))}
          </select>

          {/* CATEGORY DROPDOWN */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* SERVICE DISTANCE */}
          <input
            type="number"
            placeholder="Service Distance (Km)"
            value={serviceDistanceKm}
            onChange={(e) => setServiceDistanceKm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* KML FILE */}
          <input
            type="file"
            accept=".kml"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg bg-gray-50 cursor-pointer"
          />

          {kmlFile && (
            <p className="text-sm text-green-600">
              Selected: {kmlFile.name}
            </p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating Hub..." : "Add Hub"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default HubManagement;