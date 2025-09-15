import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, reset } from '../auth/authS.js'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth);

    useEffect(() => {
        if(user || isSuccess){
            navigate("/");
            dispatch(reset());
        }
    }, [user, isSuccess, navigate, dispatch]);

    const Auth = async (e) => {
        e.preventDefault();
        dispatch(LoginUser({email, password}))
    }

 return (
  <section className="bg-gray-50 dark:bg-gray-200 h-screen flex">
    {/* Bagian kiri gambar */}
    <div className="w-full h-full hidden lg:flex items-center justify-center">
      <img
        src="/img.png" // ganti sesuai gambar yang kamu taruh di public
        alt="Login Illustration"
        className="h-full w-full object-cover"
      />
    </div>

    {/* Bagian kanan form */}
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow dark:border w-full max-w-md p-6 sm:p-8 dark:bg-gray-300 dark:border-gray-500">
        <form onSubmit={Auth} className="space-y-10" 
        action="/login">
        {isError && <p className="text-red-500">{message}</p>}

          <div>
            <label className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Input your Email"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Input your Password"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  </section>
 );



}

export default Login;