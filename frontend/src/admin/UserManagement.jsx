import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBan, FaCheck, FaHistory } from "react-icons/fa";

// Example: get users from localStorage or use mock data
const getUsers = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.length === 0) {
    // Mock users with email and password
    return [
      { id: 1, name: "Alice", email: "alice@email.com", password: "alice123", banned: false, history: ["Used TTS", "Generated Image"] },
      { id: 2, name: "Bob", email: "bob@email.com", password: "bob123", banned: true, history: ["Changed Voice"] },
    ];
  }
  return users;
};

const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const UserManagement = () => {
  const [users, setUsers] = useState(getUsers());

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const toggleBan = (id) => {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, banned: !user.banned } : user
      )
    );
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">User Management</h3>
      <div className="space-y-4">
        {users.map(user => (
          <motion.div
            key={user.id}
            className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl shadow ${user.banned ? "bg-red-100" : "bg-green-100"}`}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex-1 space-y-1">
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-sm text-gray-700"><span className="font-semibold">Email:</span> {user.email || "-"}</div>
              <div className="text-sm text-gray-700"><span className="font-semibold">Password:</span> {user.password || "-"}</div>
              <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <FaHistory /> <span className="font-semibold">Model Usage:</span> {user.history && user.history.length > 0 ? user.history.join(", ") : "No history"}
              </div>
            </div>
            <button
              onClick={() => toggleBan(user.id)}
              className={`mt-4 md:mt-0 md:ml-6 py-2 px-4 rounded-lg font-bold flex items-center gap-2 transition ${
                user.banned
                  ? "bg-green-400 text-white hover:bg-green-500"
                  : "bg-pink-400 text-white hover:bg-pink-500"
              }`}
            >
              {user.banned ? <FaCheck /> : <FaBan />}
              {user.banned ? "Unban" : "Ban"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
