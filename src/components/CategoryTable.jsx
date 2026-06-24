import { useEffect, useState } from "react";
import API from "../services/api";

function CategoryTable() {

  const [categories,
    setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {

    try {

      const res =
        await API.get("/categories");

      console.log(res.data);

      setCategories(
        res.data.data || []
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div>

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          Categories
        </h2>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
          Total Categories:
          {categories.length}
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-3">
                Category ID
              </th>

              <th className="p-3">
                Category Name
              </th>

              <th className="p-3">
                Created At
              </th>

              <th className="p-3">
                Updated At
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr
                key={category.categoryId}
                className="border-t hover:bg-gray-100"
              >

                <td className="p-3">
                  {category.categoryId}
                </td>

                <td className="p-3">
                  {category.name}
                </td>

                <td className="p-3">
                  {new Date(
                    category.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {new Date(
                    category.updatedAt
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

export default CategoryTable;