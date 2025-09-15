import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const FormAddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [massege, setMassege] = useState("");
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/products", {
                name,
                price
            });
            navigate("/products");
        } catch (error) {
            if(error.response){
                setMassege(error.response.data.message);
            }
        }
    }
 
 return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <img src="/product2.png" alt="Products" className="w-30 h-30 mx-auto"/>
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

      {massege && (
        <p className="text-red-500 text-sm mb-4">{massege}</p>
      )}

      <form onSubmit={saveProduct} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Price
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
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
            to="/products"
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

export default FormAddProduct;