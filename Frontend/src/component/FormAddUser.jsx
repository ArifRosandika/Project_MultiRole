import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const FormAddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const saveUsers = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/users", {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role
            });
            navigate("/users");
        } catch (error) {
            if(error.response){
                setMessage(error.response.data.message);
            }
        }
    }

  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <img src="/user+.png" alt="Products" className="w-30 h-30 mx-auto"/>
      <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>

      {message && (
        <p className="text-red-500 text-sm mb-4">{message}</p>
      )}

      <form onSubmit={saveUsers} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Confirm Password
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Role
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <Link
            to="/users"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  </div>
 );

}

export default FormAddUser;