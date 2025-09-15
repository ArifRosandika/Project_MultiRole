import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const ProductList = () => {
    const [products, setProduct] = useState([]);   

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const response = await axios.get("http://localhost:5000/products");
            setProduct(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteProduct = async (productid) => {
        try {
            await axios.delete(`http://localhost:5000/products/${productid}`);
            getProduct();
        } catch (error) {
            console.log(error.message);
        }
    };
 return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <Link
        to="/products/add"
        className="inline-block mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </Link>

      {/* Grid product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.uuid}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-red-600 transition-colors duration-300"
          >
            {/* Product image placeholder */}
            <img
              src="/public/product.png"
              alt={product.name}
              className="w-24 h-24 object-cover mb-4 rounded"
            />

            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="mt-1 text-sm text-gray-500 italic">
              Created by: {product.user.name}
            </p>

            <div className="mt-4 flex gap-2">
              <Link
                to={`/products/edit/${product.uuid}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(product.uuid)}
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

export default ProductList