import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';

const Welcome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProduct, setTotalProducts] = useState(0);
  const [massege, setMassege] = useState("");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setTotalUsers(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setTotalProducts(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalUsers();
    fetchTotalProducts();
  }, [] );


 return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Welcome to Dashboard, <span className="text-blue-500"> {user && user.name}</span></h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-6">
        {/* Card User */}
        <div className="bg-white/35 shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <p>{massege}</p>
          <img src="/public/user.png" alt="Users" className="w-20 h-20 mb-4" />
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
          <Link
            to="/users"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Manage Users
          </Link>
        </div>

        {/* Card Products */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <img
            src="/add.png"
            alt="Products"
            className="w-20 h-20 mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          <p className="text-3xl font-bold">{totalProduct}</p>
          <Link
            to="/products"
            className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;