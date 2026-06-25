import { useEffect, useState } from "react";
import API from "../services/api";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");

      const userData =
        res.data?.data ||
        res.data?.users ||
        res.data;

      setUsers(Array.isArray(userData) ? userData : []);
    } catch (err) {
      console.log("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-medium">
        Loading Users...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Users
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">

          <thead>
            <tr className="bg-green-100">
              <th className="border p-3">User ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Mobile</th>
              <th className="border p-3">Wallet Balance</th>
              <th className="border p-3">Created At</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="text-center">

                  <td className="border p-3">
                    {user.userId}
                  </td>

                  <td className="border p-3">
                    {user.name}
                  </td>

                  <td className="border p-3">
                    {user.email}
                  </td>

                  <td className="border p-3">
                    {user.mobile}
                  </td>

                  <td className="border p-3">
                    ₹{user.walletBalance}
                  </td>

                  <td className="border p-3">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border p-4 text-center"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default UserTable;