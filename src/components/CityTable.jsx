import { useEffect, useState } from "react";
import API from "../services/api";

function CityTable() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await API.get("/cities");

      console.log(res.data);

      setCities(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Cities
        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
          Total Cities: {cities.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3">City ID</th>
              <th className="p-3">City Name</th>
              <th className="p-3">State</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Updated At</th>
            </tr>

          </thead>

          <tbody>

            {cities.map((city) => (

              <tr
                key={city.cityId}
                className="border-t hover:bg-gray-100"
              >
                <td className="p-3">{city.cityId}</td>

                <td className="p-3 capitalize">
                  {city.cityName}
                </td>

                <td className="p-3">
                  {city.state}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      city.status
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {city.status
                      ? "Active"
                      : "Inactive"}
                  </span>

                </td>

                <td className="p-3">
                  {new Date(
                    city.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {new Date(
                    city.updatedAt
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default CityTable;