import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { IoPersonCircle } from "react-icons/io5";
import { Link } from 'react-router-dom'

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            setUsers(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteUsers = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            getUsers();
        } catch (error) {
            console.log(error.message);
        }
    };


  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      <Link
        to="/users/add"
        className="inline-block mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add User
      </Link>

      {/* Grid user cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((user) => (
          <div
            key={user.uuid}
            className= "bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-blue-400 transition-colors duration-300"
          >
            <IoPersonCircle className="text-6xl text-gray-500 mb-4" />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-1 text-sm text-gray-500 italic">{user.role}</p>

            <div className="mt-4 flex gap-2">
              <Link
                to={`/users/edit/${user.uuid}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteUsers(user.uuid)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); 
}

export default UserList